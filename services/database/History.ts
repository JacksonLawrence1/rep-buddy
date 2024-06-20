import * as SqLite from 'expo-sqlite';

import database from '@/services/database/Database';

import { ExerciseHistory, ExerciseHistoryRow, ExerciseHistoryDisplay } from '@/services/database/ExerciseHistory';
import { WorkoutHistory, WorkoutHistoryRow } from '@/services/database/WorkoutHistory';

import exerciseDatabase from '@/services/database/Exercises'
import workoutDatabase from '@/services/database/Workouts'

import { Exercise, LogExerciseSet, Workout } from '@/constants/types';

class History {
  db: SqLite.SQLiteDatabase;
  exerciseHistory: ExerciseHistory;
  workoutHistory: WorkoutHistory;

  constructor(db: SqLite.SQLiteDatabase) {
    this.db = db;
    this.exerciseHistory = new ExerciseHistory(db);
    this.workoutHistory = new WorkoutHistory(db);
  }

  private async convertExerciseRow(exerciseHistory: ExerciseHistoryRow): Promise<ExerciseHistoryDisplay | undefined> {
      try {
        // get the workout history
        const workoutHistory: WorkoutHistoryRow = await this.getWorkoutHistory(exerciseHistory.workout_history_id);

        // get the full exercise data
        const exercise: Exercise = await exerciseDatabase.getExercise(exerciseHistory.exercise_id);

        // get the full workout data
        const workout: Workout = await workoutDatabase.getWorkout(workoutHistory.workout_id);

        // create the display object
        const display: ExerciseHistoryDisplay = {
          id: exerciseHistory.id,
          exerciseName: exercise.name,
          workoutName: workout.name,
          date: workoutHistory.date,
          reps: exerciseHistory.reps.split(',').map(Number),
          weight: exerciseHistory.weight.split(',').map(Number)
        }

        return display;
      } catch (error) {
        throw new Error(`${error}`);
      }
  }
  
  private async convertExerciseRows(rows: ExerciseHistoryRow[]): Promise<ExerciseHistoryDisplay[]> {
    const display: ExerciseHistoryDisplay[] = [];

    for (const row of rows) {
      try {
        const displayRow: ExerciseHistoryDisplay | undefined = await this.convertExerciseRow(row);

        // only add the row if it was successfully converted
        if (displayRow) {
          display.push(displayRow);
        }
      } catch (error) {
        throw new Error(`Error converting exercise history row: ${row} with error: ${error}`);
      }
    }

    return display;
  }

  // gets all the exercise history for a specific exercise
  async getExerciseHistory(id: number): Promise<ExerciseHistoryDisplay[]> {
    const rows: ExerciseHistoryRow[] = await this.exerciseHistory.getExerciseHistory(id); 
    // PERF: this is inefficient, as we don't need to fetch the exercise data for every row 
    return this.convertExerciseRows(rows); // get complete data, like workout name, exercise name, etc.
  }

  async getWorkoutHistory(id: number): Promise<WorkoutHistoryRow> {
    try {
      const row = await this.workoutHistory.getWorkoutHistory(id);

      if (row === undefined) {
        throw new Error(`No workout history found with id: ${id}`);
      }

      return row;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getAllWorkoutHistory(): Promise<WorkoutHistoryRow[]> {
    return await this.workoutHistory.getAllWorkoutHistory();
  }

  async getWorkoutHistoryForWorkout(workout_id: number): Promise<WorkoutHistoryRow[]> {
    return this.workoutHistory.getAllHistoryForWorkout(workout_id);
  }

  async addWorkoutHistory(workout_id: number, finishTime: Date, duration: number, sets: LogExerciseSet[]) {
    // get created workout history id, so we can associate the exercise history with it
    const workoutHistory: WorkoutHistoryRow = await this.workoutHistory.addWorkoutHistory(workout_id, finishTime, duration);
    
    // add all the sets to the exercise history database
    return this.exerciseHistory.addExerciseHistory(workoutHistory.id, sets);
  }

  async deleteWorkoutHistory(id: number) {
    // delete all exercise history associated with the workout
    // could keep the exercise history, but would have orphaned data
    await this.exerciseHistory.deleteExerciseHistory(id);

    // delete the workout history
    return this.workoutHistory.deleteWorkoutHistory(id);
  }

  async deleteExerciseHistory(id: number) {
    return this.exerciseHistory.deleteExerciseHistory(id);
  }
}

const historyDatabase = new History(database);
export default historyDatabase;

import * as SqLite from "expo-sqlite";

import database from "@/services/database/Database";

import {
  ExerciseHistory,
  ExerciseHistoryDisplay,
  ExerciseHistoryRow,
} from "@/services/database/ExerciseHistory";
import {
  WorkoutHistory,
  WorkoutHistoryRow,
} from "@/services/database/WorkoutHistory";

import exerciseDatabase from "@/services/database/Exercises";
import workoutDatabase from "@/services/database/Workouts";

import { Exercise, LogExerciseSet, Workout } from "@/constants/types";

class History {
  db: SqLite.SQLiteDatabase;
  exerciseHistory: ExerciseHistory;
  workoutHistory: WorkoutHistory;

  constructor(db: SqLite.SQLiteDatabase) {
    this.db = db;
    this.exerciseHistory = new ExerciseHistory(db);
    this.workoutHistory = new WorkoutHistory(db);
  }

  private async convertExerciseRow(
    exerciseHistory: ExerciseHistoryRow,
  ): Promise<ExerciseHistoryDisplay | undefined> {
    try {
      // get the workout history
      const workoutHistory: WorkoutHistoryRow | undefined =
        await this.workoutHistory.getWorkoutHistory(
          exerciseHistory.workout_history_id,
        );

      if (!workoutHistory) {
        return undefined;
      }

      // get the full exercise data
      const exercise: Exercise = await exerciseDatabase.getExercise(
        exerciseHistory.exercise_id,
      );

      // get the full workout data
      const workout: Workout = await workoutDatabase.getWorkout(
        workoutHistory.workout_id,
      );

      // create the display object
      const display: ExerciseHistoryDisplay = {
        id: exerciseHistory.id,
        exerciseName: exercise.name,
        workoutName: workout.name,
        date: workoutHistory.date,
        reps: exerciseHistory.reps.split(",").map(Number),
        weight: exerciseHistory.weight.split(",").map(Number),
      };

      return display;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  private async convertExerciseRows(
    rows: ExerciseHistoryRow[],
  ): Promise<ExerciseHistoryDisplay[]> {
    const display: ExerciseHistoryDisplay[] = [];

    for (const row of rows) {
      try {
        const displayRow: ExerciseHistoryDisplay | undefined =
          await this.convertExerciseRow(row);

        // only add the row if it was successfully converted
        if (displayRow) {
          display.push(displayRow);
        }
      } catch (error) {
        throw new Error(
          `Error converting exercise history row: ${row} with error: ${error}`,
        );
      }
    }

    return display;
  }

  // gets all the exercise history for a specific exercise
  async getExerciseHistory(id: number): Promise<ExerciseHistoryDisplay[]> {
    const rows: ExerciseHistoryRow[] =
      await this.exerciseHistory.getExerciseHistory(id);
    // PERF: this is inefficient, as we don't need to fetch the exercise data for every row
    return this.convertExerciseRows(rows); // get complete data, like workout name, exercise name, etc.
  }

  async getWorkoutHistory(workout_id: number): Promise<WorkoutHistoryRow[]> {
    try {
      const row = await this.workoutHistory.getAllHistoryForWorkout(workout_id);

      if (row === undefined) {
        throw new Error(`No workout history found with id: ${workout_id}`);
      }

      return row;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getAllWorkoutHistory(): Promise<WorkoutHistoryRow[]> {
    return await this.workoutHistory.getAllWorkoutHistory();
  }

  async addWorkoutHistory(
    workout_id: number,
    finishTime: Date,
    duration: number,
    sets: LogExerciseSet[],
  ) {
    // get created workout history id, so we can associate the exercise history with it
    const workoutHistory: WorkoutHistoryRow =
      await this.workoutHistory.addWorkoutHistory(
        workout_id,
        finishTime,
        duration,
      );

    // add all the sets to the exercise history database
    return this.exerciseHistory.addExerciseHistory(workoutHistory.id, sets);
  }

  async deleteAllHistoryForWorkout(workout_id: number) {
    return this.workoutHistory.deleteHistoryForWorkout(workout_id);
  }

  async deleteWorkoutHistory(workout_history_id: number) {
    return this.workoutHistory.deleteWorkoutHistory(workout_history_id);
  }

  async deleteExerciseHistory(id: number) {
    return this.exerciseHistory.deleteExerciseHistory(id);
  }
}

const historyDatabase = new History(database);
export default historyDatabase;

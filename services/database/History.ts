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

import { LogExerciseSet } from "@/constants/types";

class History {
  db: SqLite.SQLiteDatabase;
  exerciseHistory: ExerciseHistory;
  workoutHistory: WorkoutHistory;

  constructor(db: SqLite.SQLiteDatabase) {
    this.db = db;
    this.exerciseHistory = new ExerciseHistory(db);
    this.workoutHistory = new WorkoutHistory(db);
  }

  private async convertExerciseRows(
    rows: ExerciseHistoryRow[],
    exerciseName?: string,
  ): Promise<ExerciseHistoryDisplay[]> {
    const exerciseHistory: ExerciseHistoryDisplay[] = [];

    for (const row of rows) {
      let name: string | undefined = exerciseName;

      if (!name) {
        const exercise = await exerciseDatabase.getExercise(row.exercise_id);
        name = exercise.name;
      }

      const workoutDetails = await this.workoutHistory.getWorkoutHistory(
        row.workout_history_id,
      );

      if (!workoutDetails) {
        continue;
      }

      const workout = await workoutDatabase.getWorkout(
        workoutDetails.workout_id,
      );

      exerciseHistory.push({
        id: row.id,
        exerciseName: name,
        workoutName: workout.name,
        date: workoutDetails.date,
        reps: row.reps.split(",").map((rep) => parseInt(rep)),
        weight: row.weight.split(",").map((weight) => parseFloat(weight)),
      });
    }

    return exerciseHistory;
  }

  // adds a workout name to a list of workout history rows
  private async appendWorkoutNames(
    rows: WorkoutHistoryRow[],
  ): Promise<WorkoutHistoryRow[]> {
    const rowsWithName: WorkoutHistoryRow[] = [];

    for (const row of rows) {
      // only return rows that successfully get the workout name
      const workout = await workoutDatabase.getWorkout(row.workout_id);

      if (workout) {
        rowsWithName.push({
          ...row,
          workout_name: workout.name,
        });
      }
    }

    return rowsWithName;
  }

  // gets all the exercise history for a specific exercise
  async getExerciseHistory(id: number): Promise<ExerciseHistoryDisplay[]> {
    // get the exercise details, as it will be the same for all the rows
    const exercise = await exerciseDatabase.getExercise(id);

    // get the rows from the database
    const rows: ExerciseHistoryRow[] =
      await this.exerciseHistory.getExerciseHistory(id);

    // convert the rows to the display format
    return this.convertExerciseRows(rows, exercise.name);
  }

  async getWorkoutExerciseHistory(
    workout_history_id: number,
  ): Promise<ExerciseHistoryDisplay[]> {
    // get the details for all the exercises in that single workout history
    const rows: ExerciseHistoryRow[] =
      await this.exerciseHistory.getWorkoutHistoryDetails(workout_history_id);

    // convert rows, without exercise name provided, as each row will have (likely) different exercise
    return this.convertExerciseRows(rows);
  }

  async getWorkoutHistoryDetails(workout_history_id: number): Promise<WorkoutHistoryRow> {
    try {
      const row = await this.workoutHistory.getWorkoutHistory(workout_history_id);

      if (row === undefined) {
        throw new Error(`No workout history found with id: ${workout_history_id}`);
      }

      return row;
    } catch (error) {
      throw new Error(`Failed to get workout history details: ${error}`);
    }
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

  // as we display different workouts, we need to get the workout name for each row
  async getAllWorkoutHistory(): Promise<WorkoutHistoryRow[]> {
    try {
      const rows = await this.workoutHistory.getAllWorkoutHistory();
      return this.appendWorkoutNames(rows);
    } catch (error) {
      throw new Error(`Failed to get workout history: ${error}`);
    }
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

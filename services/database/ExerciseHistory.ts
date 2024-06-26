import * as SQLite from "expo-sqlite";

import { LogExerciseSet } from "@/constants/types";

// how the data is stored in the database
export interface ExerciseHistoryRow {
  id: number;
  exercise_id: number;
  workout_history_id: number;
  position: number;
  reps: string;
  weight: string;
}

// minimum data we want to use to display the exercise history
export interface ExerciseHistoryDisplay {
  id: number;
  exerciseName: string;
  workoutName: string;
  date: string;
  reps: number[];
  weight: number[];
}

// object we use to insert data into the database
interface LogExerciseSetRow {
  exercise_id: number;
  position: number;
  reps: string;
  weight: string;
}

export class ExerciseHistory {
  db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  private convertSetsToRow(sets: LogExerciseSet[]): LogExerciseSetRow[] {
    const rows: LogExerciseSetRow[] = [];

    for (let i: number = 0; i < sets.length; i++) {
      const set: LogExerciseSet = sets[i];

      const reps: number[] = [];
      const weight: number[] = [];

      // collect all the reps and weight which are not null
      for (const exerciseSet of set.sets) {
        if (exerciseSet.reps && exerciseSet.weight) {
          // only add sets that have both completed reps and weight
          reps.push(Math.floor(exerciseSet.reps)); // incase the user entered a decimal
          weight.push(exerciseSet.weight); // precision is important, so keep decimal if entered
        }
      }

      // only add the set if we have at least one set with reps and weight
      if (reps.length > 0 && weight.length > 0) {
        rows.push({
          exercise_id: set.exercise.id,
          position: i,
          reps: reps.join(","), // convert to string for storage
          weight: weight.join(","), // convert to string for storage
        });
      }
    }

    return rows;
  }

  // SQL queries
  // bulk insert workout sets into the database
  private async _insertWorkoutSets(
    workout_history_id: number,
    sets: LogExerciseSetRow[],
  ): Promise<void> {
    return this.db.execAsync(
      sets
        .map(
          (set, i) =>
            `INSERT INTO exerciseHistory 
              (workout_history_id, exercise_id, position, reps, weight)
              VALUES 
              (${workout_history_id}, ${set.exercise_id}, ${i}, '${set.reps}', '${set.weight}')`,
        )
        .join("; "),
    );
  }

  // deletes the a single set history for an exercise
  private async _deleteExerciseHistory(
    id: number,
  ): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`DELETE FROM exerciseHistory WHERE id = ?;`, id);
  }

  private async _getExerciseHistoryFromWorkoutHistory(workout_history_id: number): Promise<ExerciseHistoryRow[]> {
    return this.db.getAllAsync(
      `SELECT * FROM exerciseHistory WHERE workout_history_id = ? ORDER BY position`,
      workout_history_id,
    );
  }

  private async _getExerciseHistoryFromExercise(
    exercise_id: number,
  ): Promise<ExerciseHistoryRow[]> {
    // sort the exercises by their workout date, if the same workout date, then sort by position
    return this.db.getAllAsync(
      `SELECT * FROM exerciseHistory
       JOIN workoutHistory ON workoutHistory.id = exerciseHistory.workout_history_id 
       WHERE exercise_id = ?
       ORDER BY workoutHistory.date DESC, exerciseHistory.position
      `,
      exercise_id,
    );
  }

  // public functions to interact with database
  // get all the exercise history associated with an single exercise
  async getExerciseHistory(exercise_id: number): Promise<ExerciseHistoryRow[]> {
    return this._getExerciseHistoryFromExercise(exercise_id);
  }

  // gets all the exercise history associated with a single workout history
  async getWorkoutHistoryDetails(workout_history_id: number): Promise<ExerciseHistoryRow[]> {
    return this._getExerciseHistoryFromWorkoutHistory(workout_history_id);
  }

  async addExerciseHistory(
    workout_history_id: number,
    sets: LogExerciseSet[],
  ): Promise<void> {
    const rows: LogExerciseSetRow[] = this.convertSetsToRow(sets);
    try {
      // bulk insert all the exercises into the database
      await this._insertWorkoutSets(workout_history_id, rows);
    } catch (error) {
      throw new Error(`Error adding exercise history: ${error}`);
    }
  }

  // delete history for a single exercise entry, not all entries
  async deleteExerciseHistory(id: number): Promise<number | undefined> {
    try {
      await this._deleteExerciseHistory(id);
      return id; // return the id of the deleted exercise history if successful
    } catch (error) {
      throw new Error(`Error deleting exercise history: ${error}`);
    }
  }
}

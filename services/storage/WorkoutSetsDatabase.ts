import { WorkoutSet } from '@/constants/types';
import * as SQLite from 'expo-sqlite';
import exerciseDatabase from './ExerciseDatabase';

interface WorkoutSetRow {
  sets: number;
  position: number;
  workout_id: number;
  exercise_id: number;
}

// this is the only data used to display a workout set in the UI
export interface WorkoutSetRowDisplay {
  sets: number;
  position: number;
  exercise_id: number;
  exercise_name: string;
}

export interface WorkoutSetRowWithId extends WorkoutSetRow {
  id: number;
}

export default class WorkoutSetsDatabase {
  db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  private async _getWorkoutSets(workout_id: number): Promise<WorkoutSetRowWithId[]> {
    return this.db.getAllAsync(
      `SELECT * FROM workoutSets WHERE workout_id = ? ORDER BY position ASC`,
      workout_id,
    );
  }

  private async _deleteWorkoutSets(workout_id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`DELETE FROM workoutSets WHERE workout_id = ?`, workout_id);
  }

  // bulk insert workout sets into the database
  private async _insertWorkoutSets(
    workoutId: number,
    workoutSets: WorkoutSet[],
  ): Promise<void> {
    return this.db.execAsync(
      workoutSets
        .map(
          (set, i) =>
            `INSERT INTO workoutSets 
              (sets, position, workout_id, exercise_id)
              VALUES 
              (${set.sets}, ${i}, ${workoutId}, ${set.exercise.id})`,
        )
        .join("; "),
    );
  }

  // gets all the workout sets associated with a workout id
  async getWorkoutSets(workout_id: number): Promise<WorkoutSet[]> {
    try {
      const sets: WorkoutSetRowWithId[] = await this._getWorkoutSets(workout_id);
      return await this.uncompressSets(sets);
    } catch (error) {
      throw new Error(`Error getting workout sets: ${error}`);
    }
  }

  async addWorkoutSets(workout_id: number, workoutSets: WorkoutSet[]): Promise<void> {
    try {
      await this._insertWorkoutSets(workout_id, workoutSets);
    } catch (error) {
      throw new Error(`Error adding workout sets: ${error}`);
    }
  }

  async deleteWorkoutSets(workout_id: number): Promise<void> {
    try {
      await this._deleteWorkoutSets(workout_id);
    } catch (error) {
      throw new Error(`Error deleting workout sets: ${error}`);
    }
  }

  private async uncompressSets(
    sets: WorkoutSetRowWithId[],
  ): Promise<WorkoutSet[]> {
    const workoutSets: WorkoutSet[] = [];

    for (const row of sets) {
      try {
        const exercise = await exerciseDatabase.getExercise(row.exercise_id);
        if (!exercise) {
          throw new Error(`Exercise with id ${row.exercise_id} not found`);
        }
        workoutSets.push({
          sets: row.sets,
          exercise: exercise,
        });
      } catch (error) {
        throw new Error(`Error uncompressing set: ${row} - ${error}`);
      }
    }

    return workoutSets;
  }
}

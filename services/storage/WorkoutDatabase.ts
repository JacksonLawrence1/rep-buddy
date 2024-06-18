import * as SQLite from "expo-sqlite";

import database from "@/services/storage/Database";
import exerciseDatabase from "@/services/storage/ExerciseDatabase";

import { Workout, WorkoutSet } from "@/constants/types";

export type WorkoutRow = {
  id: number;
  name: string;
};

interface WorkoutSetRow {
  sets: number;
  position: number;
  workoutId: number;
  exerciseId: number;
}

interface WorkoutSetRowWithId extends WorkoutSetRow {
  id: number;
}

class WorkoutDatabase {
  db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;

    this.addTestData();
  }

  async getWorkoutRow(id: number): Promise<WorkoutRow> {
    try {
      const row: WorkoutRow | null = await this.db.getFirstAsync(
        `SELECT * FROM workouts WHERE id = ?`,
        id,
      );

      if (!row) {
        throw new Error(`Workout with id ${id} not found`);
      }

      return row;
    } catch (error) {
      throw new Error(`Error getting workout with id ${id}: ${error}`);
    }
  }

  async getWorkoutSets(id: number): Promise<WorkoutSetRowWithId[]> {
    try {
      const sets: WorkoutSetRowWithId[] = await this.db.getAllAsync(
        `SELECT * FROM workoutSets WHERE workoutId = ? ORDER BY position ASC`,
        id,
      );
      return sets;
    } catch (error) {
      throw new Error(`Error getting workout sets: ${error}`);
    }
  }

  async getWorkouts(): Promise<WorkoutRow[]> {
    try {
      const rows: WorkoutRow[] = await this.db.getAllAsync(
        `SELECT * FROM workouts`,
      );
      return rows as WorkoutRow[];
    } catch (error) {
      throw new Error(`Error getting exercises: ${error}`);
    }
  }

  async nameExists(name: string): Promise<boolean> {
    return this.db
      .getFirstAsync(`SELECT * FROM workouts WHERE name = ?`, name)
      .then((result) => (result ? true : false))
      .catch(() => false); // if error, assume name doesn't exist
  }

  async insertWorkoutSets(
    workoutId: number,
    workoutSets: WorkoutSet[],
  ): Promise<void> {
    try {
      // bulk insert all workout sets
      await this.db.execAsync(
        workoutSets
          .map((set, i) =>
             `INSERT INTO workoutSets 
              (sets, position, workoutId, exerciseId)
              VALUES 
              (${set.sets}, ${i}, ${workoutId}, ${set.exercise.id})`
          ).join("; "),
      );
    } catch (error) {
      throw new Error(`Error adding workout sets: ${error}`);
    }
  }

  async getWorkout(id: number): Promise<Workout | undefined> {
    try {
      // get the name and id of the workout from the database
      const { name }: WorkoutRow = await this.getWorkoutRow(id);

      // get all the workout sets that match the workout id from the database
      const workoutSets: WorkoutSetRowWithId[] = await this.getWorkoutSets(id);

      // convert the workout sets to the full workout set
      const sets = await this.uncompressSets(workoutSets);

      // compile the workout
      return { id, name, sets };
    } catch (error) {
      throw new Error(`Error getting workout with id ${id}: ${error}`);
    }
  }

  async addWorkout(name: string, workoutSets: WorkoutSet[]): Promise<number> {
    try {
      const result = await this.db.runAsync(
        "INSERT INTO workouts (name) VALUES (?);",
        name,
      );
      const workoutId: number = result.lastInsertRowId;

      // insert the workout sets
      await this.insertWorkoutSets(workoutId, workoutSets);

      return workoutId;
    } catch (error) {
      throw new Error(`Error adding exercise: ${error}`);
    }
  }

  async deleteWorkout(id: number): Promise<void> {
    try {
      // delete the workout
      await this.db.runAsync(`DELETE FROM workouts WHERE id = ?`, id);

      // delete the sets associated with the workout
      await this.db.runAsync(`DELETE FROM workoutSets WHERE workoutId = ?`, id);
    } catch (error) {
      throw new Error(`Error deleting workout with id ${id}: ${error}`);
    }
  }

  async updateWorkout(id: number, name: string, workoutSets: WorkoutSet[]): Promise<WorkoutRow> {
    try {
      // update the workout name
      await this.db.runAsync(`UPDATE workouts SET name = ? WHERE id = ?`, name, id);

      // delete the old workout sets
      // PERF: might be better to only update the sets that have changed, but not sure how to do efficiently
      await this.db.runAsync(`DELETE FROM workoutSets WHERE workoutId = ?`, id);

      // insert the new workout sets
      await this.insertWorkoutSets(id, workoutSets);

      // if successful, return the updated workout name and id
      return { id, name };
    } catch (error) {
      throw new Error(`Error updating workout with id ${id}: ${error}`);
    }
  }

  private async uncompressSets(
    sets: WorkoutSetRowWithId[],
  ): Promise<WorkoutSet[]> {
    const workoutSets: WorkoutSet[] = [];

    for (const row of sets) {
      try {
        const exercise = await exerciseDatabase.getExercise(row.exerciseId);
        if (!exercise) {
          throw new Error(`Exercise with id ${row.exerciseId} not found`);
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

  private addTestData(): void {
    this.db.execAsync(`
      INSERT INTO workouts (name) VALUES ('Test Workout 1');
      INSERT INTO workouts (name) VALUES ('Test Workout 2');
      INSERT INTO workouts (name) VALUES ('Test Workout 3');
      INSERT INTO workouts (name) VALUES ('Test Workout 4');
    `);
  }
}

const workoutDatabase = new WorkoutDatabase(database);
export default workoutDatabase;

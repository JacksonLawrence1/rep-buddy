import * as SQLite from "expo-sqlite";

import database from "@/services/storage/Database";

import { Workout, WorkoutSet } from "@/constants/types";
import WorkoutSetsDatabase from "./WorkoutSetsDatabase";

export type WorkoutRow = {
  id: number;
  name: string;
};

class WorkoutDatabase {
  private db: SQLite.SQLiteDatabase;
  private workoutSetsDb: WorkoutSetsDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
    this.workoutSetsDb = new WorkoutSetsDatabase(db);

    this.addTestData();
  }

  private async _getWorkout(id: number): Promise<WorkoutRow | null> {
    return this.db.getFirstAsync(`SELECT * FROM workouts WHERE id = ?`, id);
  }

  private async _getAllWorkouts(): Promise<WorkoutRow[]> {
    return this.db.getAllAsync(`SELECT * FROM workouts`);
  }

  private async _insertWorkout(name: string): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync("INSERT INTO workouts (name) VALUES (?);", name);
  }

  private async _updateWorkoutName(
    id: number,
    name: string,
  ): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(
      `UPDATE workouts SET name = ? WHERE id = ?;`,
      name,
      id,
    );
  }

  private async _deleteWorkout(id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`DELETE FROM workouts WHERE id = ?;`, id);
  }


  private async _nameExists(
    name: string,
    filter?: string,
  ): Promise<WorkoutRow | null> {
    return this.db.getFirstAsync(
      `SELECT * FROM exercises WHERE name = ? AND name != ?`,
      name,
      filter || "",
    );
  }

  async getWorkout(id: number): Promise<Workout | undefined> {
    try {
      // get the name and id of the workout from the database
      const row: WorkoutRow | null = await this._getWorkout(id);

      if (!row) {
        throw new Error(`Workout with id ${id} not found`);
      }

      // get all the workout sets that match the workout id from the database
      const workoutSets: WorkoutSet[] = await this.workoutSetsDb.getWorkoutSets(id);

      // compile the workout
      return { id, name: row.name, sets: workoutSets };
    } catch (error) {
      throw new Error(`Error getting workout with id ${id}: ${error}`);
    }
  }

  async getWorkouts(): Promise<WorkoutRow[]> {
    try {
      const rows: WorkoutRow[] = await this._getAllWorkouts();
      return rows;
    } catch (error) {
      throw new Error(`Error getting workouts: ${error}`);
    }
  }

  async addWorkout(
    name: string,
    workoutSets: WorkoutSet[],
  ): Promise<WorkoutRow> {
    try {
      const result = await this._insertWorkout(name);
      const workout_id: number = result.lastInsertRowId;

      // add the workout sets
      await this.workoutSetsDb.addWorkoutSets(workout_id, workoutSets);

      // return the row that was added
      return { id: workout_id, name } as WorkoutRow;
    } catch (error) {
      throw new Error(`Error adding exercise: ${error}`);
    }
  }

  async deleteWorkout(id: number): Promise<void> {
    try {
      // delete the workout
      await this._deleteWorkout(id);

      // delete all the sets associated with the workout
      await this.workoutSetsDb.deleteWorkoutSets(id);
    } catch (error) {
      throw new Error(`Error deleting workout with id ${id}: ${error}`);
    }
  }

  async updateWorkout(
    id: number,
    name: string,
    workoutSets: WorkoutSet[],
  ): Promise<WorkoutRow> {
    try {
      // update the workout name
      await this._updateWorkoutName(id, name);

      // delete the old workout sets
      // PERF: might be better to only update the sets that have changed
      await this.workoutSetsDb.deleteWorkoutSets(id);

      // insert the new/updated workout sets
      await this.workoutSetsDb.addWorkoutSets(id, workoutSets);

      // if successful, return the updated workout name and id
      return { id, name };
    } catch (error) {
      throw new Error(`Error updating workout with id ${id}: ${error}`);
    }
  }

  async nameExists(name: string, filter?: string): Promise<boolean> {
    try {
      const row: WorkoutRow | null = await this._nameExists(name, filter);
      return row !== null;
    } catch (error) {
      throw new Error(`Error whilst checking if workout name exists: ${error}`);
    }
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

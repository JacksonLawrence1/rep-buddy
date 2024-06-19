import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import * as SQLite from "expo-sqlite";
import database from "./Database";

export type ExerciseRow = {
  id: number;
  name: string;
  muscleGroups: string;
};

class Exercises {
  db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  // SQL queries
  private async _getExercise(id: number): Promise<ExerciseRow | null> {
    return this.db.getFirstAsync(`SELECT * FROM exercises WHERE id = ?`, id);
  }

  private async _getAllExercises(): Promise<ExerciseRow[]> {
    return this.db.getAllAsync(`SELECT * FROM exercises`);
  }

  private async _nameExists(name: string, filter?: string): Promise<ExerciseRow | null> {
    return this.db.getFirstAsync(
      `SELECT * FROM exercises WHERE name = ? AND name != ?`,
      name,
      filter || "",
    );
  }

  private async _insertExercise(name: string, muscleGroups: MuscleGroup[]): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(
      "INSERT INTO exercises (name, muscleGroups) VALUES (?, ?);",
      name,
      muscleGroups.join(","),
    );
  }

  private async _updateExercise(id: number, name: string, muscleGroups: MuscleGroup[]): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(
      `UPDATE exercises SET name = ?, muscleGroups = ? WHERE id = ?;`,
      name,
      muscleGroups.join(","),
      id,
    );
  }

  private async _deleteExercise(id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`DELETE FROM exercises WHERE id = ?;`, id);
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    try {
      const row: ExerciseRow | null = await this._getExercise(id);
      return row ? this.convertToExercise(row) : undefined;
    } catch (error) {
      throw new Error(`Error getting exercise with id ${id}: ${error}`);
    }
  }

  async getExercises(): Promise<Exercise[]> {
    try {
      const rows: ExerciseRow[] = await this._getAllExercises();
      return rows.map((row) => this.convertToExercise(row));
    } catch (error) {
      throw new Error(`Error getting exercises: ${error}`);
    }
  }

  async nameExists(name: string, filter?: string): Promise<boolean> {
    try {
      const row: ExerciseRow | null = await this._nameExists(name, filter);
      return row !== null;
    } catch (error) {
      throw new Error(`Error checking if exercise name exists: ${error}`);
    }
  }

  async addExercise(
    name: string,
    muscleGroups: MuscleGroup[],
  ): Promise<Exercise> {
    try {
      const result = await this._insertExercise(name, muscleGroups);

      // compile the new exercise
      return { id: result.lastInsertRowId, name, muscleGroups } as Exercise;
    } catch (error) {
      throw new Error(`Error adding exercise: ${error}`);
    }
  }

  async deleteExercise(id: number): Promise<number | undefined> {
    try {
      await this._deleteExercise(id);
      return id; // return the id of the deleted exercise if successful
    } catch (error) {
      throw new Error(`Error deleting exercise: ${error}`);
    }
  }

  async replaceExercise(
    id: number,
    newName: string,
    muscleGroups: string[],
  ): Promise<Exercise> {
    try {
      await this._updateExercise(id, newName, muscleGroups as MuscleGroup[]);

      // compile the new exercise if successful
      return {
        id,
        name: newName,
        muscleGroups,
      } as Exercise
    } catch (error) {
      throw new Error(`Error replacing exercise: ${error}`);
    }
  }


  private convertToExercise(row: ExerciseRow): Exercise {
    return {
      id: row.id,
      name: row.name,
      muscleGroups: row.muscleGroups.split(",") as MuscleGroup[],
    };
  }
}

const exerciseDatabase = new Exercises(database);
export default exerciseDatabase;

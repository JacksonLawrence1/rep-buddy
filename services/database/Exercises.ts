import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import * as SQLite from "expo-sqlite";
import database from "./Database";
import { ExerciseHistory } from "./ExerciseHistory";
import DatabaseBase from "./DatabaseBase";

export type ExerciseRow = {
  id: number;
  name: string;
  muscleGroups: string;
};

class Exercises extends DatabaseBase<ExerciseRow> {
  exerciseHistorydb: ExerciseHistory;

  constructor(db: SQLite.SQLiteDatabase) {
    super(db, "exercises");
    this.exerciseHistorydb = new ExerciseHistory(db);
  }

  // SQL queries
  private async _insertExercise(
    name: string,
    muscleGroups: MuscleGroup[],
  ): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(
      "INSERT INTO exercises (name, muscleGroups) VALUES (?, ?);",
      name,
      muscleGroups.join(","),
    );
  }

  private async _updateExercise(
    id: number,
    name: string,
    muscleGroups: MuscleGroup[],
  ): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(
      `UPDATE exercises SET name = ?, muscleGroups = ? WHERE id = ?;`,
      name,
      muscleGroups.join(","),
      id,
    );
  }

  async getExercise(id: number): Promise<Exercise> {
    try {
      const row: ExerciseRow | null = await this._getRow(id);

      if (!row) {
        throw new Error(`Exercise with id ${id} not found`);
      }

      return this.convertToExercise(row);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getExercises(): Promise<Exercise[]> {
    try {
      const rows: ExerciseRow[] = await this._getAllRows();
      return rows.map((row) => this.convertToExercise(row));
    } catch (error) {
      throw new Error(`Error getting exercises: ${error}`);
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
      await this._deleteRow(id);

      // delete history for the exercise
      await this.exerciseHistorydb.deleteExerciseHistory(id);

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
      } as Exercise;
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

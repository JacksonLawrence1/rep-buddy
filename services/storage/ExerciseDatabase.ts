import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import * as SQLite from "expo-sqlite";
import database from "./Database";

type ExerciseRow = {
  id: number;
  name: string;
  muscleGroups: string;
};

class ExercisesDatabase {
  db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;

    this.addTestData();
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    try {
      const row: ExerciseRow | null = await this.db.getFirstAsync(
        `SELECT * FROM exercises WHERE id = ?`,
        id,
      );
      return row ? this.convertToExercise(row) : undefined;
    } catch (error) {
      throw new Error(`Error getting exercise with id ${id}: ${error}`);
    }
  }

  async getExercises(): Promise<Exercise[]> {
    try {
      const rows: ExerciseRow[] = await this.db.getAllAsync(
        `SELECT * FROM exercises`,
      );
      return rows.map((row) => this.convertToExercise(row));
    } catch (error) {
      throw new Error(`Error getting exercises: ${error}`);
    }
  }

  async nameExists(name: string): Promise<boolean> {
    return this.db
      .getFirstAsync(`SELECT * FROM exercises WHERE name = ?`, name)
      .then((result) => (result ? true : false))
      .catch(() => false); // if error, assume name doesn't exist
  }

  async addExercise(
    name: string,
    muscleGroups: MuscleGroup[],
  ): Promise<Exercise> {
    try {
      const result = await this.db.runAsync(
        "INSERT INTO exercises (name, muscleGroups) VALUES (?, ?);",
        name,
        muscleGroups.join(","),
      );

      const id: number = result.lastInsertRowId;
      const exercise: Exercise = { id, name, muscleGroups };
      return exercise;
    } catch (error) {
      throw new Error(`Error adding exercise: ${error}`);
    }
  }

  async deleteExercise(id: number): Promise<number | undefined> {
    try {
      await this.db.runAsync(`DELETE FROM exercises WHERE id = ?;`, id);

      // return the deleted id (if successful)
      return id;
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
      await this.db.runAsync(
        `UPDATE exercises SET name = ?, muscleGroups = ? WHERE id = ?;`,
        newName,
        // have a consistent ordering for muscle groups
        muscleGroups.sort((a, b) => a.localeCompare(b)).join(","),
        id,
      );

      // id should remain the same as old id
      const exercise: Exercise = {
        id,
        name: newName,
        muscleGroups: muscleGroups as MuscleGroup[],
      };

      return exercise;
    } catch (error) {
      throw new Error(`Error replacing exercise: ${error}`);
    }
  }

  // TODO: Delete this when done testing
  private addTestData(): void {
    const baseExercises = [
      {
        name: "Military Press",
        muscleGroups: [MuscleGroup.SHOULDERS],
      },
      {
        name: "Barbell Bench Press",
        muscleGroups: [MuscleGroup.CHEST],
      },
      {
        name: "Overhead Press",
        muscleGroups: [MuscleGroup.SHOULDERS],
      },
      {
        name: "Deadlift",
        muscleGroups: [MuscleGroup.BACK],
      },
      {
        name: "Barbell Squat",
        muscleGroups: [MuscleGroup.LEGS],
      },
      {
        name: "Dumbbell Curls",
        muscleGroups: [MuscleGroup.BICEPS],
      },
    ];

    for (const exercise of baseExercises) {
      this.db.runSync(
        `INSERT INTO exercises (name, muscleGroups) VALUES (?, ?);`,
        exercise.name,
        exercise.muscleGroups.join(","),
      );
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

const exerciseDatabase = new ExercisesDatabase(database);
export default exerciseDatabase;

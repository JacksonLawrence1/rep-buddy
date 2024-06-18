import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import * as SQLite from "expo-sqlite";

type ExerciseRow = {
  id: number;
  name: string;
  muscleGroups: string;
};

class ExercisesDatabase {
  db: SQLite.SQLiteDatabase;

  // TODO: remove cache, we don't actually need it
  cache: Map<number, Exercise> = new Map();

  constructor() {
    this.db = SQLite.openDatabaseSync("exercises.db");

    this.db.execSync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        muscleGroups TEXT
      );`,
    );

    this.addTestData();

    // since constructor can't do async operations, do a synchronous one (instead of this.getExercises())
    const rows: ExerciseRow[] = this.db.getAllSync(`SELECT * FROM exercises`);

    for (const row of rows) {
      this.cache.set(row.id, this.convertToExercise(row));
    }
  }

  getExerciseFromCache(id: number): Exercise | undefined {
    return this.cache.get(id) || undefined;
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
      this.cache.delete(id);
      return id;
    } catch (error) {
      throw new Error(`Error deleting exercise: ${error}`);
    }
  }

  async replaceExercise(
    id: number,
    newName: string,
    muscleGroups: string[],
  ): Promise<Exercise | undefined> {
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

      this.cache.set(id, exercise);
      return exercise;
    } catch (error) {
      throw new Error(`Error replacing exercise: ${error}`);
    }
  }

  // TODO: Delete this when done testing
  private addTestData(): void {
    this.db.runSync(`DELETE FROM exercises;`);

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

const exerciseDatabase = new ExercisesDatabase();
export default exerciseDatabase;

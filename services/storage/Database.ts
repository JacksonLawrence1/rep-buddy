import { MuscleGroup } from "@/constants/enums/muscleGroups";
import * as SQLite from "expo-sqlite";

class Database {
  db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("workout.db");

    this.initExercises();
    this.initWorkouts();
    this.initWorkoutSets();

    // WARNING: Clear when done testing
    this.clearTables();
    this.addTestExercises();
    this.addTestWorkouts();
  }

  private initExercises() {
    this.db.execSync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        muscleGroups TEXT
      );`,
    );
  }

  private initWorkouts() {
    this.db.execSync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT
      );`,
    );
  }

  private initWorkoutSets() {
    this.db.execSync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS workoutSets (
        id INTEGER PRIMARY KEY NOT NULL,
        sets INTEGER,
        position INTEGER,
        workout_id INTEGER, 
        exercise_id INTEGER,
        FOREIGN KEY (workout_id) REFERENCES workouts (id),
        FOREIGN KEY (exercise_id) REFERENCES exercises (id)
      );`,
    );
  }

  private clearTables() {
    this.db.execSync("DELETE FROM exercises;");
    this.db.execSync("DELETE FROM workouts;");
    this.db.execSync("DELETE FROM workoutSets;");
  }

  // TODO: Delete this when done testing
  private addTestExercises(): void {
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

  private addTestWorkouts(): void {

  }
}

const database = new Database();
export default database.db;

import * as SQLite from "expo-sqlite";

class Database {
  db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("workout.db");

    this.initExercises();
    this.initWorkouts();
    this.initWorkoutSets();

    this.clearTables();
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
}

const database = new Database();
export default database.db;

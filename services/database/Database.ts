import * as SQLite from "expo-sqlite";

class Database {
  db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("workout.db");

    this.initExercises();
    this.initWorkouts();
    this.initWorkoutSets();
    this.initWorkoutHistory();
    this.initExerciseHistory();
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

  private initWorkoutHistory() {
    this.db.execSync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS workoutHistory (
        id INTEGER PRIMARY KEY NOT NULL,
        workout_id INTEGER,
        date TEXT,
        duration INTEGER,
        FOREIGN KEY (workout_id) REFERENCES workouts (id)
      );`,
    );
  }

  private initExerciseHistory() {
    this.db.execSync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS exerciseHistory (
        id INTEGER PRIMARY KEY NOT NULL,
        workout_history_id INTEGER,
        exercise_id INTEGER,
        position INTEGER,
        reps TEXT,
        weight TEXT,
        FOREIGN KEY (exercise_id) REFERENCES exercises (id)
        FOREIGN KEY (workout_history_id) REFERENCES workoutHistory (id)
      );`,
    );
  }

  private clearTables() {
    this.db.execSync("DELETE FROM exercises;");
    this.db.execSync("DELETE FROM workouts;");
    this.db.execSync("DELETE FROM workoutSets;");
    this.db.execSync("DELETE FROM workoutHistory;");
    this.db.execSync("DELETE FROM exerciseHistory;");
  }
}

const database = new Database();
export default database.db;

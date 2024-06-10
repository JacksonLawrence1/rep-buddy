import * as SQLite from 'expo-sqlite';

class ExerciseDatabase {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync("exercise.db");
    this.init();
  }

  async init() {
    this.db.runAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        name TEXT,
        muscleGroups TEXT
      );
    `);
  }

  async getExercises() {
    return this.db.runAsync("SELECT * FROM exercises;");
  }
}

const exerciseDatabase = new ExerciseDatabase();
export default exerciseDatabase;

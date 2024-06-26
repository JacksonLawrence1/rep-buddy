import * as SQLite from 'expo-sqlite';

export type WorkoutHistoryRow = {
  id: number;
  workout_id: number;
  workout_name?: string;
  date: string; // as ISO string
  duration: number;
};

export class WorkoutHistory {
  db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  // SQL queries
  private async _getAllWorkoutHistory(): Promise<WorkoutHistoryRow[]> {
    return this.db.getAllAsync(`SELECT * FROM workoutHistory ORDER BY date DESC`);
  }

  private async _getAllHistoryForWorkout(workout_id: number): Promise<WorkoutHistoryRow[]> {
    return this.db.getAllAsync(`SELECT * FROM workoutHistory WHERE workout_id = ? ORDER BY date DESC`, workout_id);
  }

  private async _getWorkoutHistoryById(id: number): Promise<WorkoutHistoryRow | null> {
    return this.db.getFirstAsync(`SELECT * FROM workoutHistory WHERE id = ? ORDER BY date DESC`, id);
  }

  private async _insertWorkoutHistory(workout_id: number, date: string, duration: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(
      "INSERT INTO workoutHistory (workout_id, date, duration) VALUES (?, ?, ?);",
      workout_id,
      date, // as ISO string
      duration,
    );
  }

  private async _deleteWorkoutHistory(id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`DELETE FROM workoutHistory WHERE id = ?;`, id);
  }

  private async _deleteWorkoutsHistory(workout_id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`DELETE FROM workoutHistory WHERE workout_id = ?;`, workout_id);
  }
  
  // deletes ALL exercises associated with a workout id
  private async _deleteAllExerciseHistoryForWorkout(workout_id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`
      DELETE FROM exerciseHistory
      WHERE workout_history_id IN (
        SELECT id FROM workoutHistory WHERE workout_id = ?
      );
      `, workout_id);
  }

  // deletes only exercises associated with a workout history
  private async _deleteAllExerciseHistoryForWorkoutHistory(workout_history_id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(`
      DELETE FROM exerciseHistory
      WHERE workout_history_id = ?;
      `, workout_history_id);
  }

  // could add a limit, and a load more function at some point
  async getAllWorkoutHistory(): Promise<WorkoutHistoryRow[]> {
    try  {
      return await this._getAllWorkoutHistory();
    } catch (error) {
      throw new Error(`Failed to get workout history: ${error}`);
    }
  }

  async getAllHistoryForWorkout(workout_id: number): Promise<WorkoutHistoryRow[]> {
    try {
      // empty array if no workout history for that id was found
      return await this._getAllHistoryForWorkout(workout_id);
    } catch (error) {
      throw new Error(`Failed to get history for workouts with id ${workout_id}: ${error}`);
    }
  }

  async getWorkoutHistory(id: number): Promise<WorkoutHistoryRow | undefined> {
    try {
      // empty array if no workout history for that id was found
      const row: WorkoutHistoryRow | null = await this._getWorkoutHistoryById(id);
      return row || undefined;
    } catch (error) {
      throw new Error(`Failed to get workout history with id ${id}: ${error}`);
    }
  }

  async addWorkoutHistory(workout_id: number, finishTime: Date, duration: number): Promise<WorkoutHistoryRow> {
    const date: string = finishTime.toISOString();

    try {
      const result = await this._insertWorkoutHistory(workout_id, date, duration);
      const id = result.lastInsertRowId;
      return { id, workout_id, date, duration };
    } catch (error) {
      throw new Error(`Failed to insert workout history: ${error}`);
    }
  }

  async deleteHistoryForWorkout(workout_id: number): Promise<void> {
    try {
      // delete exercises associated with the workout
      await this._deleteAllExerciseHistoryForWorkout(workout_id);

      // delete all workout history for the workout
      await this._deleteWorkoutsHistory(workout_id);
    } catch (error) {
      throw new Error(`Failed to delete all workout history for workout with id ${workout_id}: ${error}`);
    }
  }

  async deleteWorkoutHistory(workout_history_id: number): Promise<void> {
    try {
      // delete exercises associated with the workout_history_id
      await this._deleteAllExerciseHistoryForWorkoutHistory(workout_history_id);

      // delete single workout history
      await this._deleteWorkoutHistory(workout_history_id);
    } catch (error) {
      throw new Error(`Failed to delete workout history: ${error}`);
    }
  }
}

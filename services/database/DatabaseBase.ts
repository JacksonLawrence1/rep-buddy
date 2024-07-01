import * as SQLite from 'expo-sqlite';

// yes DatabaseBase isn't a great name

export default abstract class DatabaseBase<T extends { id: number }> {
  tableName: string;
  protected db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  // table names don't seem to work by default, so we have to do this
  private query(query: string, ...params: any[]): string {
    return query.replace(/\?/g, () => {
      const param = params.shift();
      if (typeof param === 'string') {
        return `'${param}'`;
      }
      return param;
    });
  }

  protected async _getRow(id: number): Promise<T | null> {
    return this.db.getFirstAsync(this.query("SELECT * FROM ? WHERE id = ?", this.tableName, id));
  }

  protected async _getAllRows(): Promise<T[]> {
    return this.db.getAllAsync(this.query("SELECT * FROM ?", this.tableName));
  }

  private async _nameExists(name: string): Promise<T | null> {
    return this.db.getFirstAsync(this.query("SELECT * FROM ? WHERE name = ?", this.tableName, name));
  }
  
  private async _nameExistsConditional(name: string, id: number): Promise<T | null> {
    return this.db.getFirstAsync(this.query("SELECT * FROM ? WHERE name = ? AND id != ?", this.tableName, name, id));
  }

  protected async _deleteRow(id: number): Promise<SQLite.SQLiteRunResult> {
    return this.db.runAsync(this.query("DELETE FROM ? WHERE id = ?", this.tableName, id));
  }

  async nameExists(name: string, id?: number): Promise<boolean> {
    try {
      const row: T | null = id
        ? await this._nameExistsConditional(name, id)
        : await this._nameExists(name);
      return row !== null;
    } catch (error) {
      throw new Error(`Error checking if name exists: ${error}`);
    }
  }
}

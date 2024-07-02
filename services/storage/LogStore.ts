import { LogExerciseSet } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StorageLog {
  id: number; // change if we don't specify a workout
  name: string;
  date: string;
  sets: LogExerciseSet[];
}

class LogStore {
  id: number | null = null;
  date: Date | null = null;
  name: string | null = null;

  // load the log from storage
  // returns null if no log is found
  async loadStore(): Promise<StorageLog | null> {
    const log: string | null = await AsyncStorage.getItem("log");
    return log ? JSON.parse(log) : null;
  }

  async initialiseStore(id: number, date: Date, name: string, sets?: LogExerciseSet[]) {
    this.id = id;
    this.date = date;
    this.name = name;

    AsyncStorage.setItem("log", JSON.stringify({
      id: this.id,
      name: this.name,
      date: date.toISOString(),
      sets: sets || [],
    }));
  }

  // we don't need to take in id and date, as we should have it already
  async updateStore(sets: LogExerciseSet[]) {
    if (!this.id || !this.date) {
      throw new Error("Log not initialised");
    }

    // depending on how big the sets are, this might be a bit slow
    AsyncStorage.setItem("log", JSON.stringify({
      id: this.id,
      name: this.name,
      date: this.date.toISOString(),
      sets: sets,
    }));
  }
  
  // perform when finishing/exiting a workout
  async clearStore() {
    this.id = null;
    this.date = null;
    AsyncStorage.removeItem("log");
  }
}

const logStore = new LogStore();
export default logStore;

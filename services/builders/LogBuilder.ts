import { createContext } from "react";

import history from "@/services/database/History";
import { Builder } from "@/services/builders/Builder";

import { Exercise, LogExerciseSet, Workout } from "@/constants/types";
import logStore, { StorageLog } from "../storage/LogStore";

export default class LogBuilder extends Builder {
  date?: Date;
  name: string = "Unnamed Workout";
  sets: LogExerciseSet[] = [];

  initialiseStore(): void {
    if (!this.id) {
      throw new Error("No workout ID found while initialising log store");
    }

    if (!this.date) {
      this.date = new Date();
    }

    logStore.initialiseStore(this.id, this.date, this.name, this.sets);
  }

  // update the store with the current sets
  updateStore(): void {
    logStore.updateStore(this.sets);
  }

  newWorkout(workout: Workout): void {
    this.id = workout.id;
    this.name = workout.name;
    this.date = new Date();
    this.sets = workout.sets.map((set) => ({
      exercise: set.exercise,
      sets: Array.from({ length: set.sets }, () => ({
        reps: null,
        weight: null,
      })),
    }));

    this.initialiseStore();
  }

  // load the log from storage
  loadExistingWorkout(store: StorageLog): void {
    this.id = store.id;
    this.name = store.name;
    this.sets = store.sets;
    this.date = new Date(store.date); // convert the date string to a Date object

    this.initialiseStore();
  }

  get durationNum(): number {
    if (!this.date) {
      throw new Error("No date found in log");
    }

    return Date.now() - this.date.getTime();
  }

  get duration(): string {
    const duration: number = this.durationNum;

    // format to hh:mm:ss, as a string
    const time: [number, number, number] = [
      Math.floor(duration / 3600000),
      Math.floor((duration % 3600000) / 60000),
      Math.floor((duration % 60000) / 1000),
    ];

    return time.map((t) => (t < 10 ? `0${t}` : t)).join(":");
  }

  private condenseDuration(): number {
    // only get the hours and minutes
    const duration: number = this.durationNum;
    return Math.floor(duration / 3600000) * 60 + Math.floor((duration % 3600000) / 60000);
  }

  getReps(i: number, j: number): number | null {
    return this.sets[i].sets[j].reps;
  }

  getWeight(i: number, j: number): number | null {
    return this.sets[i].sets[j].weight;
  }

  addSet(i: number): void {
    this.sets[i].sets.push({ reps: null, weight: null });
    this.updateStore();
  }

  removeSet(i: number, j: number) {
    this.sets[i].sets.splice(j, 1);
    this.updateStore();
  }

  async addExercise(exercise: Exercise): Promise<void> {
    this.sets.push({
      exercise: exercise,
      sets: [{ reps: null, weight: null }],
    });
    this.updateStore();
  }

  removeExercise(i: number): void {
    this.sets.splice(i, 1);
    this.updateStore();
  }

  swapExercise(exercise: Exercise, i: number): void {
    this.sets[i].exercise = exercise;
    this.updateStore();
  }

  updateSetReps(i: number, j: number, reps: string): void {
    if (isNaN(+reps)) {
      return;
    }

    this.sets[i].sets[j].reps = reps === "" ? null : +reps;
    this.updateStore();
  }

  updateSetWeight(i: number, j: number, weight: string): void {
    if (isNaN(+weight)) {
      return;
    }

    this.sets[i].sets[j].weight = weight === "" ? null : +weight;
    this.updateStore();
  }

  async addWorkoutToHistory(): Promise<void> {
    if (!this.date) {
      throw new Error("Date could not be found");
    }

    if (!this.id) {
      // TODO: implement starting a workout from scratch
      throw new Error(
        "Workout ID could not be found, if you are trying to start a workout from scratch, this has not been implemented yet.",
      );
    }

    // adds the workout to the workout history database
    await history.addWorkoutHistory(
      this.id,
      this.date,
      this.condenseDuration(), // cut off till seconds, so we only have hours and minutes
      this.sets,
    );
  }

  async save(): Promise<void> {
    try {
      logStore.clearStore(); // clear the store after saving, so we don't load it from in progress
      return await this.addWorkoutToHistory();
    } catch (error) {
      throw new Error(`Error saving workout: ${error}`);
    }
  }
}

export const LogContext = createContext<LogBuilder | null>(null);

// calling code conditionally based on types is tedious, so we do this instead

export function createLogBuilderFromWorkout(workout: Workout): LogBuilder {
  const logBuilder = new LogBuilder();
  logBuilder.newWorkout(workout);

  return logBuilder;
}

export function createLogBuilderFromStorage(store: StorageLog): LogBuilder {
  const logBuilder = new LogBuilder();
  logBuilder.loadExistingWorkout(store);

  return logBuilder;
}

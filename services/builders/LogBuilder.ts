import { Exercise, Log, LogExerciseSet, Workout } from "@/constants/types";
import { createContext } from "react";

import history from "@/services/database/History";

import { Builder } from "./Builder";

export default class LogBuilder extends Builder {
  date?: Date;
  sets: LogExerciseSet[] = [];

  newWorkout(workout: Workout): void {
    this.id = workout.id;
    this.date = new Date();
    this.sets = workout.sets.map((set) => ({
      exercise: set.exercise,
      sets: Array.from({ length: set.sets }, () => ({
        reps: null,
        weight: null,
      })),
    }));
  }

  loadExistingWorkout(log: Log): void {
    this.id = log.id;
    this.date = new Date(log.date);
    this.sets = log.sets.map((set) => ({
      exercise: set.exercise,
      sets: set.sets.map((s) => ({
        reps: s.reps,
        weight: s.weight,
      })),
    }));
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

  getReps(i: number, j: number): number | null {
    return this.sets[i].sets[j].reps;
  }

  getWeight(i: number, j: number): number | null {
    return this.sets[i].sets[j].weight;
  }

  updateStore(): void {
    // TODO: update in progress log in storage
  }

  addSet(i: number): void {
    this.sets[i].sets.push({ reps: null, weight: null });
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
      this.durationNum,
      this.sets,
    );
  }

  async save(): Promise<void> {
    try {
      return await this.addWorkoutToHistory();
    } catch (error) {
      throw new Error(`Error saving workout: ${error}`);
    }
  }
}

export const LogContext = createContext<LogBuilder | null>(null);

import {
    Exercise,
    Log,
    LogExerciseSet,
    Workout
} from "@/constants/types";

import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { createContext } from "react";
import { Builder } from "./Builder";

export default class LogBuilder extends Builder {
  id?: number;
  name: string = "";
  date?: Date;
  sets: LogExerciseSet[] = [];

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
  }

  loadExistingWorkout(log: Log): void {
    this.id = log.id;
    this.name = log.name;
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

  swapExercise(i: number, exercise: Exercise): void {
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

  async save(dispatcher: Dispatch<UnknownAction>): Promise<void> {
    // TODO: save to storage
    // dispatcher(workoutLogService.addWorkoutLog(log));
  }
}

export const LogContext = createContext<LogBuilder | null>(null);

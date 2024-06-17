import {
    Exercise,
    Log,
    LogExerciseSet,
    LogExerciseSetCompressed,
    LogSet,
    WorkoutCompressed,
} from "@/constants/types";
import { exerciseService } from "@/features/exercises";
import { workoutService } from "@/features/workouts";
import { createContext } from "react";
import WorkoutBuilder from "./WorkoutBuilder";
import { Builder } from "./Builder";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export default class LogBuilder extends Builder {
  id: string;
  name: string;
  date: Date;
  sets: LogExerciseSet[];

  constructor(id: string) {
    super();

    const workout: WorkoutCompressed | undefined =
      workoutService.getData(id);

    if (!workout) {
      throw new Error(`No workout found with id: ${id}`);
    }

    this.id = workout.id;
    this.name = workout.name;
    this.date = new Date(); // new date for new workout

    this.setDates();

    this.sets = WorkoutBuilder.uncompressSets(workout.sets) // convert to full exercise data
      .map((set) => ({
        exercise: set.exercise,
        sets: Array.from({ length: set.sets }, () => ({
          reps: null,
          weight: null,
        })),
        isComplete: false,
      }));

    // TODO: store that we've started a workout in storage, with the date
    // if we lost the state, we can then recover it
  }

  private setDates(): void {}

  get isComplete(): boolean {
    return this.sets.every((set) => set.isComplete);
  }

  get durationNum(): number {
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

  updateState(): void {
    if (this.setState) {
      this.setState([...this.sets]);
    }
    this.updateStore();
  }

  updateStore(): void {
    // TODO: update store in storage
  }

  addSet(i: number): void {
    if (i < 0 || i >= this.sets.length) {
      throw new Error(`Index ${i} out of bounds`);
    }

    this.sets[i].sets.push({ reps: null, weight: null });
    this.updateState();
  }

  removeSet(i: number, set: number) {
    if (i < 0 || i >= this.sets.length) {
      throw new Error(`Index ${i} out of bounds`);
    }

    if (set < 0 || set >= this.sets[i].sets.length) {
      throw new Error(`Index ${set} out of bounds`);
    }

    this.sets[i].sets.splice(set, 1);
    this.updateState();
  }

  addExercise(exercise: Exercise): void {
    if (!exerciseService.exists(exercise.id)) {
      throw new Error(`Exercise with id ${exercise.id} not found`);
    }

    this.sets.push({
      exercise: exercise,
      sets: [{ reps: null, weight: null }],
      isComplete: false,
    });

    this.updateState();
  }

  removeExercise(i: number): void {
    this.sets.splice(i, 1);
    this.updateState();
  }

  swapExercise(i: number, exercise: Exercise): void {
    if (!exerciseService.exists(exercise.id)) {
      throw new Error(`Exercise with id ${exercise.id} not found`);
    }

    this.sets[i].exercise = exercise;
    this.updateState();
  }

  updateSetReps(i: number, set: number, reps: string): void {
    if (isNaN(+reps)) {
      return;
    } 

    this.sets[i].sets[set].reps = reps === "" ? null : +reps;
    this.updateStore();
  }

  getSetReps(i: number, set: number): number | null {
    return this.sets[i].sets[set].reps;
  }

  updateSetWeight(i: number, set: number, weight: string): void {
    if (isNaN(+weight)) {
      return;
    }

    this.sets[i].sets[set].weight = weight === "" ? null : +weight;
    this.updateStore();
  }

  getSetWeight(i: number, set: number): number | null {
    return this.sets[i].sets[set].weight;
  }

  completeSet(i: number): void {
    this.sets[i].isComplete = true;
  }

  save(dispatcher: Dispatch<UnknownAction>): { title: string; message: string } | undefined {

    // TODO: allow saving incomplete workouts
    if (!this.isComplete) {
      return { title: "Incomplete Workout", message: "Please complete all sets" };
    }

    const log: Log = {
      id: this.id,
      date: this.date.toISOString(),
      duration: this.durationNum,
      sets: LogBuilder.compressSets(this.sets),
    };

    // TODO: save to storage
    // dispatcher(workoutLogService.addWorkoutLog(log));
  }

  static compressSets(exercises: LogExerciseSet[]): LogExerciseSetCompressed[] {
    const compressed: LogExerciseSetCompressed[] = [];

    for (const exerciseSet of exercises) {
      const completeSets: LogSet[] = [];

      // include all sets that have both reps and weight
      for (const set of exerciseSet.sets) {
        if (set.reps !== null && set.weight !== null) {
          completeSets.push(set as LogSet);
        }
      }

      // only include if there is at least one complete set
      if (completeSets.length > 0) {
        compressed.push({
          exerciseId: exerciseSet.exercise.id,
          sets: completeSets,
        });
      }
    }

    return compressed;
  }
}

export const LogContext = createContext<LogBuilder | null>(null);

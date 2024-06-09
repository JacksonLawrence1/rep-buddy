import {
  Exercise,
  Log,
  LogExerciseSet,
  LogExerciseSetCompressed,
  LogSet,
  WorkoutCompressed,
} from "@/constants/types";
import { Service } from "@/services/Service";
import exerciseService from "../storage/ExerciseService";
import workoutService from "../storage/WorkoutService";
import WorkoutBuilder from "./WorkoutBuilder";
import { createContext } from "react";

export default class LogBuilder extends Service {
  id: string;
  name: string;
  date: Date;
  sets: LogExerciseSet[];

  constructor(id: string) {
    super();

    const workout: WorkoutCompressed | undefined =
      workoutService.getWorkout(id);

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

  addSet(i: number): void {
    if (i < 0 || i >= this.sets.length) {
      throw new Error(`Index ${i} out of bounds`);
    }

    this.sets[i].sets.push({ reps: null, weight: null });
    this.notify();

    // update store in storage
  }

  removeExercise(i: number): void {
    this.sets.splice(i, 1);
    this.notify();

    // update store in storage
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

    this.notify();

    // update store in storage
  }

  removeSet(i: number, set: number) {
    if (i < 0 || i >= this.sets.length) {
      throw new Error(`Index ${i} out of bounds`);
    }

    if (set < 0 || set >= this.sets[i].sets.length) {
      throw new Error(`Index ${set} out of bounds`);
    }

    this.sets[i].sets.splice(set, 1);
    this.notify();

    // update store in storage
  }

  updateSetReps(i: number, set: number, reps: string): void {
    if (isNaN(+reps)) {
      return;
    }

    this.sets[i].sets[set].reps = +reps;
    // update store in storage
  }

  getSetReps(i: number, set: number): number | null {
    return this.sets[i].sets[set].reps;
  }

  updateSetWeight(i: number, set: number, weight: string): void {
    if (isNaN(+weight)) {
      return;
    }

    this.sets[i].sets[set].weight = +weight;
    // update store in storage
  }

  getSetWeight(i: number, set: number): number | null {
    return this.sets[i].sets[set].weight;
  }

  completeSet(i: number): void {
    this.sets[i].isComplete = true;
  }

  swapExercises(i: number, exercise: Exercise): void {
    if (!exerciseService.exists(exercise.id)) {
      throw new Error(`Exercise with id ${exercise.id} not found`);
    }

    this.sets[i].exercise = exercise;
    this.notify();
  }

  save(): Log {
    if (!this.isComplete) {
      throw new Error("Workout log is not complete");
    }

    const log: Log = {
      id: this.id,
      date: this.date.toISOString(),
      duration: this.durationNum,
      sets: LogBuilder.compressSets(this.sets),
    };

    // TODO: save to storage
    // workoutLogService.addWorkoutLog(log);

    return log;
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

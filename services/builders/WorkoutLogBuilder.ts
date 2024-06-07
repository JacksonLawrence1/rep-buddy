import {
    Exercise,
    Workout,
    WorkoutLog,
    WorkoutLogExercise,
    WorkoutLogExerciseUncompressed,
    WorkoutLogSetComplete,
} from "@/constants/types";
import { Service } from "@/services/Service";
import exerciseService from "../storage/ExerciseService";
import workoutService from "../storage/WorkoutService";
import WorkoutBuilder from "./WorkoutBuilder";
import { createContext } from "react";

export default class WorkoutLogBuilder extends Service {
  id: string;
  name: string;
  date: string;
  duration: number;
  sets: WorkoutLogExerciseUncompressed[];

  constructor(id: string) {
    super();

    const workout: Workout | undefined = workoutService.getWorkout(id);

    if (!workout) {
      throw new Error(`No workout found with id: ${id}`);
    }

    this.id = workout.id;
    this.name = workout.name;
    this.date = new Date().toISOString();
    this.duration = 0; // TODO: add timer
    this.sets = WorkoutBuilder.uncompressSets(workout.sets) // convert to full exercise data
      .map((set) => ({
        exercise: set.exercise,
        sets: Array.from({length: set.sets}, () => ({ reps: null, weight: null })),
        isComplete: false,
      })); 
  }

  get isComplete(): boolean {
    return this.sets.every((set) => set.isComplete);
  }

  addSet(i: number): void {
    if (i < 0 || i >= this.sets.length) {
      throw new Error(`Index ${i} out of bounds`);
    }

    const newSet: WorkoutLogExerciseUncompressed = {...this.sets[i]};
    newSet.sets.push({reps: null, weight: null});

    this.sets = this.sets.toSpliced(i, 1, newSet);
    this.notify();
  }

  removeSet(i: number, set: number) {
    if (i < 0 || i >= this.sets.length) {
      throw new Error(`Index ${i} out of bounds`);
    }

    if (set < 0 || set >= this.sets[i].sets.length) {
      throw new Error(`Index ${set} out of bounds`);
    }

    const newSet: WorkoutLogExerciseUncompressed = {...this.sets[i]};
    newSet.sets = newSet.sets.toSpliced(set, 1);

    this.sets = this.sets.toSpliced(i, 1, newSet);
    this.notify();
  }

  updateSetReps(i: number, set: number, reps: number): void {
    this.sets[i].sets[set].reps = reps;
  }

  updateSetWeight(i: number, set: number, weight: number): void {
    this.sets[i].sets[set].weight = weight;
  }

  completeSet(i: number): void {
    this.sets[i].isComplete = true;
  }

  swapExercises(i: number, exerciseId: string): void {
    const exercise: Exercise | undefined =
      exerciseService.getExercise(exerciseId);

    if (!exercise) {
      throw new Error(`No exercise found with id: ${exerciseId}`);
    }

    this.sets[i].exercise = exercise;
    this.notify();
  }

  save(): WorkoutLog {
    if (!this.isComplete) {
      throw new Error("Workout log is not complete");
    }
    
    const log: WorkoutLog = {
      id: this.id,
      date: this.date,
      duration: this.duration,
      sets: WorkoutLogBuilder.compressSets(this.sets),
    }

    // TODO: save to storage
    // workoutLogService.addWorkoutLog(log);
    
    return log;
  }

  static compressSets(exercises: WorkoutLogExerciseUncompressed[]): WorkoutLogExercise[] {
    const compressed: WorkoutLogExercise[] = []; 

    for (const exerciseSet of exercises) {
      const completeSets: WorkoutLogSetComplete[] = [];

      // include all sets that have both reps and weight
      for (const set of exerciseSet.sets) {
        if (set.reps !== null && set.weight !== null) {
          completeSets.push(set as WorkoutLogSetComplete);
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

export const WorkoutLogContext = createContext<WorkoutLogBuilder | null>(null);

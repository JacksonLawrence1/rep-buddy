import {
  Workout,
  WorkoutSetUncompressed,
  WorkoutUncompressed,
} from "@/constants/types";

import workoutService from "@/services/storage/WorkoutService";
import exerciseService from "@/services/storage/ExerciseService";
import { Service } from "../Service";

class WorkoutBuilder extends Service<WorkoutSetUncompressed[]> {
  workout: WorkoutUncompressed;

  constructor(id?: string) {
    super();

    if (id) {
      const workout = workoutService.getWorkout(id);

      if (workout) {
        this.workout = WorkoutBuilder.uncompressWorkout(workout);
        return;
      } 
    }

    // if no id or workout found, create a new one
    this.workout = {
      id: "",
      name: "",
      sets: [],
    };
  }

  get id(): string {
    return this.workout.id;
  }

  get name(): string {
    return this.workout.name;
  }

  get setsLength(): number {
    return this.workout.sets.length;
  }

  updateName(name: string): void {
    this.workout.name = name;
  }

  // if i exists, then we are replacing it, but not replacing its sets
  addExercise(exerciseId: string, i: number): void {
    const exercise = exerciseService.getExercise(exerciseId);

    if (!exercise) {
      throw new Error(`Exercise with id ${exerciseId} not found`);
    }

    // make sure don't lose the sets if overwriting
    let sets: number = 1;
    if (this.workout.sets[i]) { // we are overwriting, so use their sets
      sets = this.workout.sets[i].sets;
    }

    this.addWorkoutSet({exercise: exercise, sets: sets}, i);
  }

  addWorkoutSet(set: WorkoutSetUncompressed, i: number): void {
    // places the set at the index, or at the end if i is the length
    // NOTE: must be done like this to trigger reactivity
    this.workout.sets = [...this.workout.sets.slice(0, i), set, ...this.workout.sets.slice(i + 1)];
    this.notify(this.workout.sets);
  }

  removeWorkoutSet(i: number): void {
    this.workout.sets = [...this.workout.sets.slice(0, i), ...this.workout.sets.slice(i + 1)]
    this.notify(this.workout.sets);
  }
  
  // returns the saved workout if needed
  saveWorkout(): Workout {
    if (!this.name) {
      throw new Error("No name for the workout.");
    } 

    // TODO: id generation
    if (!this.id) {
      this.workout.id = this.name;
    }

    const workout: Workout = WorkoutBuilder.compressWorkout(this.workout);
    workoutService.addWorkout(workout);
    return workout;
  }

  static uncompressWorkout(workout: Workout): WorkoutUncompressed {
    const unpackedSets: WorkoutSetUncompressed[] = workout.sets.map((set) => {
      const exercise = exerciseService.getExercise(set.id);

      if (!exercise) {
        throw new Error(`Exercise with id ${set.id} not found`);
      }

      return {exercise: exercise, sets: set.sets};
    });

    return {
      id: workout.id,
      name: workout.name,
      sets: unpackedSets,
    } as WorkoutUncompressed;
  }

  static compressWorkout(workout: WorkoutUncompressed): Workout {
    return {
      id: workout.id,
      name: workout.name,
      sets: workout.sets.map((set) => {
        return {
          id: set.exercise.id,
          sets: set.sets,
        };
      }),
    } as Workout;
  }
}

export default WorkoutBuilder;

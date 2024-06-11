import {
  Workout,
  WorkoutCompressed,
  WorkoutSet,
  WorkoutSetCompressed,
} from "@/constants/types";

import workoutService from "@/services/storage/WorkoutService";
import exerciseService from "@/services/storage/ExerciseService";
import { Service } from "../Service";

type WorkoutSetIndexObject = number | [number, number] | undefined;

class WorkoutBuilder extends Service {
  workout: Workout;

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

  set name(name: string) {
    this.workout.name = name;
  }

  nameExists(name: string): boolean {
    return workoutService.nameExists(name);
  }

  get length(): number {
    return this.workout.sets.length;
  }

  private addWorkoutSet(set: WorkoutSet, i: number): void {
    // places the set at the index, or at the end if i is the length
    // NOTE: must be done like this to trigger reactivity
    this.workout.sets = this.workout.sets.toSpliced(i, 0, set);
    this.notify();
  }

  // if i exists, then we are replacing it, but not replacing its sets
  // might be good to implement some unit tests for this
  addExercise(exerciseId: string, i: WorkoutSetIndexObject): void {
    const exercise = exerciseService.getExercise(exerciseId);

    if (!exercise) {
      throw new Error(`Exercise with id ${exerciseId} not found`);
    }
  
    // add to the end if we didn't pass in an index
    if (i === undefined) {
      this.addWorkoutSet({exercise: exercise, sets: 1}, this.length);
      return;
    }

    if (typeof i === "number") {
      // if the exercise already exists, make sure we use its sets
      const sets: number = this.workout.sets[i]?.sets || 1;
      this.addWorkoutSet({exercise: exercise, sets: sets}, i);
      return;
    }
    
    // TODO: when we want pass in a more complex index (i.e. editing a choice or superset)
    throw new Error("Not implemented " + i.toString());
  }

  removeWorkoutSet(i: number): void {
    this.workout.sets = this.workout.sets.toSpliced(i, 1);
    this.notify();
  }

  // for a given index, update the sets
  updateWorkoutSet(i: WorkoutSetIndexObject, sets: number): void {
    if (typeof i !== "number") {
      throw new Error("Invalid index given" + (i || "undefined").toString());
    }

    if (i < 0 || i >= this.length) {
      throw new Error("Index out of bounds: " + i.toString());
    }

    // we don't need to notify, as the ui should be updating itself 
    this.workout.sets[i].sets = sets;
  }
  
  // returns the saved workout if needed
  saveWorkout(): WorkoutCompressed {
    if (this.name === "") {
      // this should never happen, as we're already doing a check in the ui
      throw new Error("Name given to workout was empty.");
    } 

    if (this.workout.id) {
      workoutService.deleteData(this.workout.id);
    }

    const id: string = workoutService.generateId(this.name);
    this.workout.id = id;

    // compress so it takes less space in storage
    const workout: WorkoutCompressed = WorkoutBuilder.compressWorkout(this.workout);

    // adds/overwrites this workout to storage 
    workoutService.addWorkout(workout);
    return workout;
  }

  static uncompressWorkout(workout: WorkoutCompressed): Workout {
    const unpackedSets: WorkoutSet[] = WorkoutBuilder.uncompressSets(workout.sets);

    return {
      id: workout.id,
      name: workout.name,
      sets: unpackedSets,
    } as Workout;
  }

  static uncompressSets(sets: WorkoutSetCompressed[]): WorkoutSet[] {
    return sets.map((set) => {
      const exercise = exerciseService.getExercise(set.id);

      if (!exercise) {
        throw new Error(`Exercise with id ${set.id} not found`);
      }

      return {exercise: exercise, sets: set.sets};
    });
  }

  static compressSets(sets: WorkoutSet[]): WorkoutSetCompressed[] {
    return sets.map((set) => {
      return {
        id: set.exercise.id,
        sets: set.sets,
      };
    });
  }

  static compressWorkout(workout: Workout): WorkoutCompressed {
    const compressed = {
      id: workout.id,
      name: workout.name,
      sets: WorkoutBuilder.compressSets(workout.sets),
    } as WorkoutCompressed;

    return compressed;
  }
}

export default WorkoutBuilder;



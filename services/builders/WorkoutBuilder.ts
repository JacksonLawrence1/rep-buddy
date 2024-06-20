import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import { addWorkout, updateWorkout } from "@/features/workouts";
import { Builder } from "@/services/builders/Builder";
import workoutDatabase, {
  WorkoutRow,
} from "@/services/database/Workouts";

import { Exercise, Workout, WorkoutSet } from "@/constants/types";

type WorkoutSetIndexObject = number | [number, number] | undefined;

class WorkoutBuilder extends Builder {
  name: string = "";
  workoutSets: WorkoutSet[] = [];
  private replacing: boolean = false;

  constructor(workout?: Workout) {
    super();

    if (workout) {
      this.setWorkout(workout);
    }
  }

  setWorkout(workout: Workout): void {
    this.id = workout.id;
    this.name = workout.name;
    this.workoutSets = workout.sets;
    this.replacing = true;
  }

  async nameExists(name: string): Promise<boolean> {
    return workoutDatabase.nameExists(name);
  }

  get length(): number {
    return this.workoutSets.length;
  }

  // if i exists, then we are replacing it, but not replacing its sets
  // might be good to implement some unit tests for this
  addExercise(exercise: Exercise): WorkoutSet {
    const workoutSet: WorkoutSet = { exercise: exercise, sets: 1 };
    this.workoutSets.push(workoutSet);
    return workoutSet;
  }

  replaceExercise(exercise: Exercise, i: number): void {
    if (i < 0 || i >= 20) {
      throw new Error("Index out of bounds: " + i.toString());
    }

    this.workoutSets[i].exercise = exercise;
  }

  deleteExercise(i: number): void {
    this.workoutSets.splice(i, 1);
  }

  updateWorkoutSet(i: WorkoutSetIndexObject, sets: number): void {
    // TODO: implement complex workout sets
    if (typeof i !== "number") {
      throw new Error(`Not implemented complex workout sets yet: ${i}`);
    }

    if (i < 0 || i >= this.length) {
      throw new Error("i Index out of bounds: " + i.toString());
    }

    this.workoutSets[i].sets = sets;
  }

  private async updateWorkout(dispatcher: Dispatch<UnknownAction>): Promise<void> {
    if (!this.id) {
      throw new Error("No workout ID found while updating workout");
    }

    const row: WorkoutRow = await workoutDatabase.updateWorkout(
      this.id,
      this.name,
      this.workoutSets,
    );

    dispatcher(updateWorkout(row));
  }

  private async addWorkout(dispatcher: Dispatch<UnknownAction>): Promise<void> {
    const row: WorkoutRow = await workoutDatabase.addWorkout(
      this.name,
      this.workoutSets,
    );
    dispatcher(addWorkout(row));
  }

  // returns the saved workout if needed
  async save(dispatcher: Dispatch<UnknownAction>): Promise<void> {
    if (!this.name) {
      throw new Error("Workout name is required");
    }

    try {
      const exists: boolean = await this.nameExists(this.name);

      if (exists && !this.replacing) {
        throw new Error(`Workout with name ${this.name} already exists`);
      }

      return this.replacing ? this.updateWorkout(dispatcher) : this.addWorkout(dispatcher);
    } catch (error) {
      throw new Error(`Error saving workout: ${error}`);
    }
  }
}

export default WorkoutBuilder;

import {
    Exercise,
    Workout,
    WorkoutSet,
} from "@/constants/types";

import workoutDatabase from "../storage/WorkoutDatabase";
import { Builder } from "./Builder";

type WorkoutSetIndexObject = number | [number, number] | undefined;

class WorkoutBuilder extends Builder {
  id?: number;
  name: string = "";
  workoutSets: WorkoutSet[] = [];
  replacing: boolean = false;

  constructor(workout?: Workout) {
    super();
    
    if (workout) {
      this.setWorkout(workout);
      this.replacing = true;
      return;
    }
  }

  setWorkout(workout: Workout): void {
    this.id = workout.id;
    this.name = workout.name;
    this.workoutSets = workout.sets;
  }

  async nameExists(name: string): Promise<boolean> {
    return workoutDatabase.nameExists(name);
  }

  get length(): number {
    return this.workoutSets.length;
  }

  // if i exists, then we are replacing it, but not replacing its sets
  // might be good to implement some unit tests for this
  addExercise(exercise: Exercise): void {
    this.workoutSets.push({exercise: exercise, sets: 1});
  }

  replaceExercise(exercise: Exercise, i: number): void {
    if (i < 0 || i >= this.length) {
      throw new Error("Index out of bounds: " + i.toString());
    }

    this.workoutSets[i].exercise = exercise;
  }

  removeWorkoutSet(i: number): void {
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

  // returns the saved workout if needed
  async save(): Promise<void> {
    if (!this.name) {
      throw new Error("Workout name is required");
    } 
    
    try {
      const exists: boolean = await this.nameExists(this.name);

      if (exists) {
        throw new Error(`Workout with name ${this.name} already exists`);
      }

      // update the workout if it exists
      if (this.replacing && this.id) {
        await workoutDatabase.updateWorkout(this.id, this.name, this.workoutSets);
        return;
      }
      
      // add the workout if it doesn't exist
      await workoutDatabase.addWorkout(this.name, this.workoutSets);
    } catch (error) {
      throw new Error(`Error saving workout: ${error}`);
    }
  }
}

export default WorkoutBuilder;



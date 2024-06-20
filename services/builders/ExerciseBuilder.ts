import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import { addExercise, replaceExercise } from "@/features/exercises";
import exerciseDatabase from "@/services/database/Exercises";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Builder } from "./Builder";

export default class ExerciseBuilder extends Builder {
  name: string = "";
  muscleGroups: Set<MuscleGroup> = new Set(); // store as set for easy toggling
  private replacing: boolean = false;

  constructor(exercise?: Exercise) {
    super();

    if (exercise) {
      this.setExercise(exercise);
    }
  }

  setExercise(exercise: Exercise): void {
    this.id = exercise.id;
    this.name = exercise.name;
    this.muscleGroups = new Set(exercise.muscleGroups);
    this.replacing = true;
  }

  updateName(name: string): void {
    this.name = name;
  }

  hasMuscleGroup(muscleGroup: MuscleGroup): boolean {
    return this.muscleGroups.has(muscleGroup);
  }

  toggleMuscleGroup(muscleGroup: MuscleGroup): void {
    if (this.muscleGroups.has(muscleGroup)) {
      this.muscleGroups.delete(muscleGroup);
    } else {
      this.muscleGroups.add(muscleGroup);
    }
  }

  private async add(dispatcher: Dispatch<UnknownAction>): Promise<void> {
      const exercise: Exercise = await exerciseDatabase.addExercise(
        this.name,
        this.muscleGroupsToArray(),
      );

      dispatcher(addExercise(exercise));
  }

  private async replace(dispatcher: Dispatch<UnknownAction>): Promise<void> {
    if (!this.id) {
      throw new Error("No exercise ID found while replacing exercise");
    }

    const exercise: Exercise | undefined = await exerciseDatabase.replaceExercise(
      this.id,
      this.name,
      this.muscleGroupsToArray(),
    );

    if (exercise) {
      dispatcher(replaceExercise(exercise));
    }
  }

  // cast set to array, to make it serializable
  private muscleGroupsToArray(): MuscleGroup[] {
    return Array.from(this.muscleGroups);
  }

  async save(dispatcher: Dispatch<UnknownAction>): Promise<void> {
    if (!this.name) {
      throw new Error("Exercise name is required");
    }

    try {
      const exists: boolean = await exerciseDatabase.nameExists(this.name);

      if (exists && !this.replacing) {
        throw new Error("Exercise name already exists");
      }

      return this.replacing ? this.replace(dispatcher) : this.add(dispatcher);
    } catch (error) {
      throw new Error(`Error saving exercise: ${error}`);
    }
  }
}

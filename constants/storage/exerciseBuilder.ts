import { Exercise } from "@/constants/types";

import { MuscleGroup } from "../enums/muscleGroups";

import exerciseService from "@/constants/storage/exercises";

class ExerciseBuilder {
  exercise: Exercise;

  constructor(id?: string) {
    if (id) {
      const exercise: Exercise | undefined = exerciseService.getExercise(id);

      if (exercise) {
        this.exercise = exercise;
        return;
      } 
    }

    // if no id or exercise found, create a new one
    this.exercise = {
      id: "",
      name: "",
      muscleGroups: new Set(),
    };
  }

  get name(): string {
    return this.exercise.name;
  }

  get id(): string {
    return this.exercise.id;
  }

  get muscleGroups(): Set<MuscleGroup> {
    return this.exercise.muscleGroups;
  }

  updateName(name: string): void {
    this.exercise.name = name;
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
  
  saveExercise(): Exercise { // returns the saved exercise
    if (!this.name) {
      throw new Error("No name for the workout.");
    } 

    // TODO: replace with proper id generation
    if (!this.id || this.id === "") {
      this.exercise.id = this.name;
    }

    // create the exercise
    const exercise: Exercise = {
      id: this.id,
      name: this.name,
      muscleGroups: this.muscleGroups,
    };

    // will overwrite if already exists
    exerciseService.addExercise(exercise);
    return exercise;
  }
}

export default ExerciseBuilder;

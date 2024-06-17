import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import {
    addExercise,
    exerciseService,
    replaceExercise,
} from "@/features/exercises";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Builder } from "./Builder";

export default class ExerciseBuilder extends Builder {
  id: string = "";
  name: string = "";
  muscleGroups: Set<MuscleGroup> = new Set(); // store as set for easy toggling
  private replacing: boolean = false;

  constructor(id?: string) {
    super();

    if (id) {
      const exercise: Exercise | undefined = exerciseService.getData(id);

      if (exercise) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.muscleGroups = new Set(exercise.muscleGroups);
        this.replacing = true;
        return;
      }
    }
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

  save(dispatcher: Dispatch<UnknownAction>): { title: string; message: string } | undefined {
    if (!this.name) {
      return { title: "Invalid Name", message: "Please enter an exercise name" };
    } 

    const id: string = exerciseService.generateId(this.name);
    const exists = exerciseService.getData(id);

    if (exists && !this.replacing) {
      return { title: "Duplicate Name", message: "An exercise with that name already exists" };
    }

    // create the exercise
    const exercise: Exercise = {
      id: id,
      name: this.name,
      // convert set to array, as it is not serializable
      muscleGroups: Array.from(this.muscleGroups).sort(),
    };

    if (this.replacing) {
      dispatcher(replaceExercise({id: this.id, exercise: exercise}));
      return;
    }

    dispatcher(addExercise(exercise));
  }
}

import { Exercise } from "@/constants/types";
import { MuscleGroup } from "@/constants/enums/muscleGroups";

import exerciseService from "@/services/storage/ExerciseService";

export default class ExerciseBuilder {
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
  
  set name(name: string) {
    this.updateName(name);
  }

  get id(): string {
    return this.exercise.id;
  }

  get muscleGroups(): Set<MuscleGroup> {
    return this.exercise.muscleGroups;
  }

  // delete this after testing
  set muscleGroups(muscleGroups: Set<MuscleGroup>) {
    this.exercise.muscleGroups = muscleGroups;
  }

  nameExists(name: string): boolean {
    return exerciseService.nameExists(name);
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
    if (!this.name || this.name === "") {
      throw new Error("No name for the workout.");
    } 

    // if we change the name, id changes so delete the old one
    exerciseService.deleteData(this.id);
  
    const id: string = exerciseService.generateId(this.name);

    // create the exercise
    const exercise: Exercise = {
      id: id, 
      name: this.name,
      muscleGroups: this.muscleGroups,
    };

    // will overwrite if already exists
    exerciseService.addExercise(exercise);
    return exercise;
  }
}

const baseExercises = [
  { name: "Military Press", muscleGroups: new Set([MuscleGroup.SHOULDERS]) },
  { name: "Barbell Bench Press", muscleGroups: new Set([MuscleGroup.CHEST]) },
  { name: "Overhead Press", muscleGroups: new Set([MuscleGroup.SHOULDERS]) },
  { name: "Deadlift", muscleGroups: new Set([MuscleGroup.BACK]) },
  { name: "Barbell Squat", muscleGroups: new Set([MuscleGroup.LEGS]) },
  { name: "Dumbbell Curls", muscleGroups: new Set([MuscleGroup.BICEPS]) },
];

// TODO: remove when done testing
for (const exercise of baseExercises) {
  const builder: ExerciseBuilder = new ExerciseBuilder();
  builder.name = exercise.name;
  builder.muscleGroups = exercise.muscleGroups;
  builder.saveExercise();
}

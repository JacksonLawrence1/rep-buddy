import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { BaseStorageClass } from "@/constants/storage/BaseStorageClass";

import { type Exercise } from "@/constants/types";

class ExerciseService extends BaseStorageClass<Exercise> {
  constructor() {
    super("exercises");
  }

  getExercise(id: string): Exercise | undefined {
    return this.getData(id);
  }

  async addExercise(exercises: Exercise | Exercise[]): Promise<void> {
    this.addData(exercises);
  }
}

const exerciseService = new ExerciseService();

// WARNING: remove when done testing 

// TODO: ids should be generated
const baseExercises: Exercise[] = [
  { id: "Military Press", name: "Military Press", muscleGroups: new Set([MuscleGroup.SHOULDERS]) },
  { id: "Barbell Bench Press", name: "Barbell Bench Press", muscleGroups: new Set([MuscleGroup.CHEST]) },
  { id: "Overhead Press", name: "Overhead Press", muscleGroups: new Set([MuscleGroup.SHOULDERS]) },
  { id: "Deadlift", name: "Deadlift", muscleGroups: new Set([MuscleGroup.BACK]) },
  { id: "Barbell Squat", name: "Barbell Squat", muscleGroups: new Set([MuscleGroup.LEGS]) },
  { id: "Dumbbell Curls", name: "Dumbbell Curls", muscleGroups: new Set([MuscleGroup.BICEPS]) },
];
exerciseService.clearData();


exerciseService.syncCache();
if (exerciseService.size === 0) {
  exerciseService.addExercise(baseExercises);
}

export default exerciseService;

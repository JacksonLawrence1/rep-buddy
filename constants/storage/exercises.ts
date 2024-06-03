import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { BaseStorageClass } from "@/constants/storage/BaseStorageClass";

import { type Exercise } from "@/constants/types";

class ExerciseService extends BaseStorageClass<Exercise> {
  constructor() {
    super("exercises");
  }

  async getExercise(id: string): Promise<Exercise | string> {
    return await this.getData(id) || "Exercise not found";
  }

  async addExercise(exercises: Exercise | Exercise[]): Promise<void> {
    this.addData(exercises);
  }
}

const exerciseService = new ExerciseService();

// WARNING: remove when done testing 

// TODO: ids should be generated
const baseExercises: Exercise[] = [
  { id: "Military Press", name: "Military Press", muscleGroups: [MuscleGroup.SHOULDERS] },
  { id: "Barbell Bench Press", name: "Barbell Bench Press", muscleGroups: [MuscleGroup.CHEST] },
  { id: "Overhead Press", name: "Overhead Press", muscleGroups: [MuscleGroup.SHOULDERS] },
  { id: "Deadlift", name: "Deadlift", muscleGroups: [MuscleGroup.BACK] },
  { id: "Barbell Squat", name: "Barbell Squat", muscleGroups: [MuscleGroup.LEGS] },
  { id: "Dumbbell Curls", name: "Dumbbell Curls", muscleGroups: [MuscleGroup.BICEPS]}
];
exerciseService.clearData();


exerciseService.syncCache();
if (exerciseService.size === 0) {
  exerciseService.addExercise(baseExercises);
}

export default exerciseService;

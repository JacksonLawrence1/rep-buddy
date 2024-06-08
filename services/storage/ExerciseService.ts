import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { StorageService } from "@/services/storage/StorageService";

import { type Exercise } from "@/constants/types";

class ExerciseService extends StorageService<Exercise> {
  constructor() {
    super("exercises");
  }

  getExercise(id: string): Exercise {
    const exercise: Exercise | undefined = this.getItem(id);

    if (!exercise) {
      throw new Error(`No exercise found with id: ${id}`);
    }

    return exercise;
  }

  getExercises(): Exercise[] {
    return this.dataAsArray;
  }

  async addExercise(exercises: Exercise | Exercise[]): Promise<void> {
    this.addData(exercises);
  }

  // TODO: What happens when we delete an exercise that is in a workout?
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


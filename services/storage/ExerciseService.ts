import { StorageService } from "@/services/storage/StorageService";

import { type Exercise } from "@/constants/types";
import { MuscleGroup } from "@/constants/enums/muscleGroups";

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

exerciseService.clearData();
exerciseService.syncCache();

const baseExercises = [
  { id: "military_press", name: "Military Press", muscleGroups: new Set([MuscleGroup.SHOULDERS]) },
  { id: "barbell_bench_press", name: "Barbell Bench Press", muscleGroups: new Set([MuscleGroup.CHEST]) },
  { id: "overhead_press", name: "Overhead Press", muscleGroups: new Set([MuscleGroup.SHOULDERS]) },
  { id: "deadlift", name: "Deadlift", muscleGroups: new Set([MuscleGroup.BACK]) },
  { id: "barbell_squat", name: "Barbell Squat", muscleGroups: new Set([MuscleGroup.LEGS]) },
  { id: "dumbbell_curls", name: "Dumbbell Curls", muscleGroups: new Set([MuscleGroup.BICEPS]) },
];

for (const exercise of baseExercises) {
  exerciseService.addExercise(exercise);
}


export default exerciseService;


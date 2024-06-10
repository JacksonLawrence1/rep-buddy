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

exerciseService.clearData();
exerciseService.syncCache();

export default exerciseService;


import { StorageService } from "@/services/storage/StorageService";
import { WorkoutCompressed } from "@/constants/types";
import WorkoutBuilder from "../builders/WorkoutBuilder";

class WorkoutService extends StorageService<WorkoutCompressed> {
  constructor() {
    super("workouts");
  }
  
  getWorkout(id: string): WorkoutCompressed | undefined  {
    return this.getItem(id);
  }

  getWorkouts(): WorkoutCompressed[] {
    return this.dataAsArray;
  }

  async addWorkout(workout: WorkoutCompressed | WorkoutCompressed[]): Promise<void> {
    this.addData(workout);
  }
}

const workoutService = new WorkoutService();

// TODO: remove when done testing 

workoutService.clearData();

workoutService.syncCache();

export default workoutService;

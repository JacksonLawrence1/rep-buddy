import { StorageService } from "@/services/storage/StorageService";
import { WorkoutCompressed } from "@/constants/types";

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

const baseWorkouts: WorkoutCompressed[] = [
  { id: "leg_day", name: "Leg Day", sets: [{id: "barbell_squat", sets: 3}] },
  { id: "push_day", name: "Push Day", sets: [{id: "barbell_bench_press", sets: 3}] },
  { id: "pull_day", name: "Pull Day", sets: [{id: "deadlift", sets: 3}] },
]

baseWorkouts.forEach((workout) => {
  workoutService.addWorkout(workout);
});

export default workoutService;

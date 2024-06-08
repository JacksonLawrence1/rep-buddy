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

const testWorkoutTemplates: WorkoutCompressed[] = [
  { id: "mcaa", name: "Monday Chest and Arms", sets: [{id: "Barbell Bench Press", sets: 2}, {id: "Dumbbell Curls", sets: 3}] },
  { id: "wl", name: "Wednesday Legs", sets: [{id: "Barbell Squat", sets: 3}, {id: "Deadlift", sets: 3}] },
  { id: "fs", name: "Friday Shoulders", sets: [{id: "Military Press", sets: 3}, {id: "Overhead Press", sets: 3}] }
];
workoutService.clearData();


workoutService.syncCache();

if (workoutService.size === 0) {
  workoutService.addWorkout(testWorkoutTemplates);
}

export default workoutService;

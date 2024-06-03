import { BaseStorageClass } from "@/constants/storage/BaseStorageClass";
import { Workout } from "@/constants/types";

class WorkoutService extends BaseStorageClass<Workout> {
  constructor() {
    super("workouts");
  }
  
  async getWorkout(id: string): Promise<Workout | string> {
    return await this.getData(id) || "Exercise not found";
  }

  async addWorkout(workout: Workout | Workout[]): Promise<void> {
    this.addData(workout);
  }
}

const workoutService = new WorkoutService();

// TODO: remove when done testing 

const testWorkoutTemplates: Workout[] = [
  { id: "mcaa", name: "Monday Chest and Arms", sets: [{exerciseId: "Barbell Bench Press", sets: 2}, {exerciseId: "Dumbbell Curls", sets: 3}] },
  { id: "wl", name: "Wednesday Legs", sets: [{exerciseId: "Barbell Squat", sets: 3}, {exerciseId: "Deadlift", sets: 3}] },
  { id: "fs", name: "Friday Shoulders", sets: [{exerciseId: "Military Press", sets: 3}, {exerciseId: "Overhead Press", sets: 3}] }
];
workoutService.clearData();


workoutService.syncCache();
if (workoutService.size === 0) {
  workoutService.addWorkout(testWorkoutTemplates);
}

export default workoutService;

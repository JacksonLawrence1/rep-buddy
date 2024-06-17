import { WorkoutCompressed } from "@/constants/types";
import { StorageService } from "@/services/classes/StorageService";
import { createSlice } from "@reduxjs/toolkit";

// allows us to find exercises by id
export const workoutService = new StorageService<WorkoutCompressed>("workouts");

// WARNING: remove when done testing

workoutService.clearData();
workoutService.syncCache();

const baseWorkouts: WorkoutCompressed[] = [
  { 
    id: "leg_day", 
    name: "Leg Day", 
    sets: [{ id: "barbell_squat", sets: 3 }] 
  },
  {
    id: "push_day",
    name: "Push Day",
    sets: [{ id: "barbell_bench_press", sets: 3 }],
  },
  { 
    id: "pull_day", 
    name: "Pull Day", 
    sets: [{ id: "deadlift", sets: 3 }] 
  },
];

for (const workout of baseWorkouts) {
  workoutService.addData(workout);
}

const workouts = createSlice({
  name: "workouts",
  initialState: workoutService.dataAsArray,
  reducers: {
    // use these only to update state
    addWorkout(state, action) {
      const workout = action.payload;

      workoutService.addData(workout);
      state.push(workout);
    },
    deleteWorkout(state, action) {
      const id = action.payload;

      workoutService.deleteData(id);

      return state.filter((exercise) => exercise.id !== id);
    },
    replaceWorkout(state, action) {
      const { id, workout } = action.payload;

      workoutService.deleteData(id);
      workoutService.addData(workout);

      return state.map((w) => (w.id === id ? workout : w));
    },
  },
});

export const { addWorkout, deleteWorkout, replaceWorkout } = workouts.actions;

export default workouts.reducer;

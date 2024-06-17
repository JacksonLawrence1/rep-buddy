import { MuscleGroup } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";
import { StorageService } from "@/services/classes/StorageService";
import { createSlice } from "@reduxjs/toolkit";

// allows us to find exercises by id
export const exerciseService = new StorageService<Exercise>("exercises");

// WARNING: remove when done testing

exerciseService.clearData();
exerciseService.syncCache();

const baseExercises = [
  {
    id: "military_press",
    name: "Military Press",
    muscleGroups: [MuscleGroup.SHOULDERS],
  },
  {
    id: "barbell_bench_press",
    name: "Barbell Bench Press",
    muscleGroups: [MuscleGroup.CHEST],
  },
  {
    id: "overhead_press",
    name: "Overhead Press",
    muscleGroups: [MuscleGroup.SHOULDERS],
  },
  { id: "deadlift", name: "Deadlift", muscleGroups: [MuscleGroup.BACK] },
  {
    id: "barbell_squat",
    name: "Barbell Squat",
    muscleGroups: [MuscleGroup.LEGS],
  },
  {
    id: "dumbbell_curls",
    name: "Dumbbell Curls",
    muscleGroups: [MuscleGroup.BICEPS],
  },
];

for (const exercise of baseExercises) {
  exerciseService.addData(exercise);
}

const exercises = createSlice({
  name: "exercises",
  initialState: exerciseService.dataAsArray,
  reducers: {
    // use these only to update state
    addExercise(state, action) {
      const exercise = action.payload;

      exerciseService.addData(exercise);
      state.push(exercise);
    },
    deleteExercise(state, action) {
      const id = action.payload;

      exerciseService.deleteData(id);

      return state.filter((exercise) => exercise.id !== id);
    },
    replaceExercise(state, action) {
      const { id, exercise } = action.payload;

      exerciseService.deleteData(id);
      exerciseService.addData(exercise);

      return state.map((e) => (e.id === id ? exercise : e));
    },
  },
});

export const { addExercise, deleteExercise, replaceExercise } = exercises.actions;

export default exercises.reducer;

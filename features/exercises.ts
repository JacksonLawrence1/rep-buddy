import { Exercise } from "@/constants/types";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import exerciseDatabase from "@/services/database/Exercises";

// async action
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => exerciseDatabase.getExercises(),
);

const exercises = createSlice({
  name: "exercises",
  initialState: [] as Exercise[],
  reducers: {
    addExercise: (state, action) => {
      const exercise = action.payload;
      state.push(exercise);
    },
    deleteExercise: (state, action) => {
      const id = action.payload;

      return state.filter((exercise) => exercise.id !== id);
    },
    replaceExercise: (state, action) => {
      const exercise = action.payload;
      const index = state.findIndex((e) => e.id === exercise.id);

      if (index !== -1) {
        state[index] = exercise;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchExercises.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

// non-async actions
export const { addExercise, deleteExercise, replaceExercise } = exercises.actions;
export default exercises.reducer;


// Selectors:
// input 
export const selectExercises = (state: Exercise[]) => state;
const filter = (_: Exercise[], filter: string | undefined) => filter || "";

// memoized 
export const selectExercisesByFilter = createSelector([selectExercises, filter],
  (state: Exercise[], filter: string) => {
  return state
    .filter((exercise) =>
      exercise.name.toLowerCase().includes(filter?.toLowerCase() || ""),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
});


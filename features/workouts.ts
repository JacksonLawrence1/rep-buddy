import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import workoutDatabase, { WorkoutRow } from "@/services/database/Workouts";

// async action
export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async () => workoutDatabase.getWorkouts(),
);

const workouts = createSlice({
  name: "exercises",
  initialState: [] as WorkoutRow[], // workout rows only contain name and id for efficiency
  reducers: {
    addWorkout: (state, action) => {
      const workoutRow: WorkoutRow = action.payload;
      state.push(workoutRow);
    },
    deleteWorkout: (state, action) => {
      const id = action.payload;
      return state.filter((workout) => workout.id !== id);
    },
    updateWorkout: (state, action) => {
      const workout: WorkoutRow = action.payload;

      const index = state.findIndex((w) => w.id === workout.id);

      // update to new workout
      if (index !== -1) {
        state[index] = workout;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchWorkouts.fulfilled, (_, action) => {
      // on fetch workouts return the list of workout rows
      return action.payload;
    });
  },
});

// non-async actions
export const { addWorkout, deleteWorkout, updateWorkout } = workouts.actions;
export default workouts.reducer;

// Selectors:
// input 
export const selectWorkouts = (state: WorkoutRow[]) => state;
const filter = (_: WorkoutRow[], filter: string | undefined) => filter || "";

// memoized 
export const selectWorkoutsByFilter = createSelector([selectWorkouts, filter],
  (state: WorkoutRow[], filter: string) => {
  return state
    .filter((exercise) =>
      exercise.name.toLowerCase().includes(filter?.toLowerCase() || ""),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
});



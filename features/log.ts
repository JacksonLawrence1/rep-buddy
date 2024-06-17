import { LogExerciseSet } from "@/constants/types";
import { createSlice } from "@reduxjs/toolkit";

const log = createSlice({
  name: "log",
  initialState: new Array<LogExerciseSet>(),
  reducers: {
  },
});

export default log.reducer;


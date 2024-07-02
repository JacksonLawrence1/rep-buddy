import { router } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import LogBuilder, {
  LogContext,
  createLogBuilderFromStorage,
  createLogBuilderFromWorkout,
} from "@/services/builders/LogBuilder";
import workoutDatabase from "@/services/database/Workouts";
import logStore from "@/services/storage/LogStore";

import { showAlert } from "@/features/alerts";

import LogContent from "@/components/log/LogContent";
import DefaultPage from "@/components/pages/DefaultPage";
import Alert from "@/components/primitives/Alert";

type WorkoutLogProps = {
  id: number;
  inProgress?: boolean;
};

// using the workout in memory, inject it into our log builder
async function loadLogFromMemory(): Promise<LogBuilder> {
  // check if there is a workout in progress in memory, it should exist as inProgress is true here
  const store = await logStore.loadStore();

  if (!store) {
    throw new Error("Could not load in progress workout from memory");
  }

  return createLogBuilderFromStorage(store);
}

// setup the log builder using the workout as a base
async function loadNewLog(workout_id: number): Promise<LogBuilder> {
  // fetch the workout from the database
  const workout = await workoutDatabase.getWorkout(workout_id);

  if (!workout) {
    throw new Error("Failed to load workout");
  }

  return createLogBuilderFromWorkout(workout);
}

export default function Log({ id, inProgress }: WorkoutLogProps) {
  const content = useLoading(loadLog);
  const dispatch = useDispatch();
  const [showExit, setShowExit] = useState(false);

  async function loadLog(setContent: SetContentStateAction) {
    try {
      // load the log from memory or from the database
      const log = inProgress ? await loadLogFromMemory() : await loadNewLog(id);

      // display the content once loaded
      setContent(
        <LogContext.Provider value={log}>
          <LogContent log={log} />
        </LogContext.Provider>,
      );
    } catch (error) {
      dispatch(showAlert({ title: "Failed to load", description: `${error}` }));
      router.back();
    }
  }

  function exit() {
    // if the user exits the workout, assume they don't want to load it again
    logStore.clearStore();

    router.back();
  }

  return (
    <DefaultPage
      title="Workout"
      callback={() => setShowExit(true)}
      theme="modal"
    >
      <Alert
        visible={showExit}
        setVisible={setShowExit}
        title="Exit Workout?"
        description="Are you sure you want to exit this workout? All data will be lost and will not show up in your history."
        submitText="Exit"
        onSubmit={exit}
      />
      {content}
    </DefaultPage>
  );
}

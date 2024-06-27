import useId from "@/hooks/useId";

import HistoryComponent, {
  HistoryDetails,
} from "@/components/history/HistoryComponent";
import WorkoutHistoryItem from "@/components/workouts/WorkoutHistoryItem";
import ExerciseHistoryItem from "@/components/exercises/ExerciseHistoryItem";
import workoutDatabase from "@/services/database/Workouts";
import historyDatabase from "@/services/database/History";
import exerciseDatabase from "@/services/database/Exercises";
import { WorkoutHistoryRow } from "@/services/database/WorkoutHistory";

export enum HistoryType {
  Workouts,
  Workout,
  Exercise,
}

export interface HistorySettings {
  type: HistoryType;
  pageTitle?: string;
  modal?: boolean;
  title?: boolean;
  date?: boolean;
  itemTitle?: boolean;
  swapTitle?: boolean;
  itemDate?: boolean;
}

export default function useHistory(settings: HistorySettings) {
  // functions to grab and modify data subject to settings
  // we can pass as callbacks as children because of closures
  async function getExerciseHistory(
    id: number,
  ) {
    const history = settings.type === HistoryType.Workout ? await historyDatabase.getWorkoutExerciseHistory(id) : await historyDatabase.getExerciseHistory(id);

    // HACK: hijack data so details we want are displayed correctly
    history.forEach((row) => {
      if (!settings.itemTitle) {
        row.exerciseName = "";
      } else if (settings.swapTitle) {
        row.exerciseName = row.workoutName;
      }

      if (!settings.itemDate) {
        row.date = "";
      }
    });
    return history;
  }

  async function getWorkoutHistory(workout_id: number) {
    return historyDatabase.getWorkoutHistory(workout_id);
  }

  async function getExerciseDetails(id: number) {
    const details: HistoryDetails = {};

    if (settings.title) {
      const exercise = await exerciseDatabase.getExercise(id);
      details["title"] = exercise.name;
    }

    return details;
  }

  async function getWorkoutDetails(
    id: number,
  ) {
    const details: HistoryDetails = {};

    if (settings.title) {
      const workout = settings.type === HistoryType.Workout ? 
        await workoutDatabase.getWorkoutByHistoryId(id) :
        await workoutDatabase.getWorkout(id);
      details["title"] = workout.name;
    }

    // only get date if we're sure its a history id
    if (settings.date) {
      if (settings.type !== HistoryType.Workout) {
        console.error("Cannot get date for non-workout history id");
      }

      const history =
        await historyDatabase.getWorkoutHistoryDetails(id);
      details["date"] = history.date;
    }

    return details;
  }

  function onInit(id: number) {
    const props = { id, title: settings.pageTitle, modal: settings.modal };

    // render respective history list based on type
    // ts complains about type if we don't do it like this
    switch (settings.type) {
      case HistoryType.Workouts:
        return (
          <HistoryComponent<WorkoutHistoryRow>
            {...props}
            HistoryListItem={WorkoutHistoryItem}
            onGetHistory={getWorkoutHistory}
            onGetDetails={getWorkoutDetails}
          />
        );
      case HistoryType.Workout:
        return (
          <HistoryComponent
            {...props}
            HistoryListItem={ExerciseHistoryItem}
            onGetHistory={getExerciseHistory}
            onGetDetails={getWorkoutDetails}
          />
        );
      case HistoryType.Exercise:
        return (
          <HistoryComponent
            {...props}
            HistoryListItem={ExerciseHistoryItem}
            onGetHistory={getExerciseHistory}
            onGetDetails={getExerciseDetails}
          />
        );
    }
  }

  // no id given for workout, representing workout from scratch
  return useId(
    onInit,
    "Could not get your history, please try restarting the app.",
  );
}

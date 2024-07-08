import { FlatList, Text, View } from "react-native";

import Button from "@/components/buttons/Button";
import WorkoutSetItem from "@/components/workouts/WorkoutSetItem";

import { globalStyles } from "@/constants/styles";
import { Workout } from "@/constants/types";
import useLoading, { SetContentStateAction } from "@/hooks/useLoading";
import DefaultPage from "../pages/DefaultPage";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { showAlert } from "@/features/alerts";
import workoutDatabase from "@/services/database/Workouts";
import Alert, { AlertContextProps } from "../primitives/Alert";
import { useState } from "react";

type WorkoutViewerProps = {
  workout_id: number;
  alertSettings?: AlertContextProps;
};

type WorkoutViewProps = {
  workout: Workout;
  startWorkout?: () => void;
};

function WorkoutView({ workout, startWorkout }: WorkoutViewProps) {
  return (
    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.listTitle}>{workout.name}</Text>
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={workout.sets}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <WorkoutSetItem key={index} item={item} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      </View>
      {startWorkout && (
        <Button label="Start Workout" theme="primary" onPress={startWorkout} />
      )}
    </View>
  );
}

export default function WorkoutViewer({
  workout_id,
  alertSettings,
}: WorkoutViewerProps) {
  const content = useLoading(loadWorkout);
  const [showStart, setShowStart] = useState(false);
  const dispatch = useDispatch();

  // render the workout sets
  async function loadWorkout(setContent: SetContentStateAction) {
    // try to get the workout from the database
    try {
      // throws error if not found
      const workout = await workoutDatabase.getWorkout(workout_id);

      // use the workout to render the view
      setContent(
        <WorkoutView
          workout={workout}
          // only show the start workout button if we have alert settings
          startWorkout={alertSettings ? showPopup : undefined}
        />,
      );
    } catch (error) {
      dispatch(
        showAlert({ title: "Failed to load Workout", description: `${error}` }),
      );
      router.back();
    }
  }

  function showPopup() {
    setShowStart(true);
  }

  function startWorkout() {
    // navigate to the log page with the workout id
    router.push({
      pathname: "/log/[id]",
      params: { id: workout_id },
    });
  }

  return (
    <DefaultPage
      title="Your Workout"
      theme="modal"
      callback={() => router.back()}
    >
      {alertSettings && (
        <Alert
          onSubmit={startWorkout}
          visible={showStart}
          setVisible={setShowStart}
          {...alertSettings}
        />
      )}
      {content}
    </DefaultPage>
  );
}

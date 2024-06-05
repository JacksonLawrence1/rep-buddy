import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutSetItem from "./WorkoutSetItem";

import { globalStyles } from "@/constants/styles";
import { WorkoutSetUncompressed } from "@/constants/types";

import WorkoutBuilder from "@/constants/storage/workoutBuilder";

type WorkoutBuilderProps = {
  id: string | undefined;
};


// TODO: BIG TODO
export default function WorkoutBuilderComponent({ id }: WorkoutBuilderProps) {
  const { exerciseId, i } = useLocalSearchParams<{exerciseId: string, i: string}>();

  // cache workout builder
  const workout = useMemo(() => new WorkoutBuilder(id), [id]);

  const [workoutSets, setWorkoutSets] = useState<WorkoutSetUncompressed[]>(workout.workoutSets);

  const updateName = (name: string) => workout.updateName(name);

  useEffect(() => {
    function updateWorkoutSets(set: WorkoutSetUncompressed[]) {
      setWorkoutSets(set);
    }

    // subscribe for updates in case we want to remove sets
    workout.subscribe("builder", updateWorkoutSets);

    // any time we are "passed" an exercise id, add it to the workout
    if (exerciseId) {
      console.log(exerciseId);
      workout.addExercise(exerciseId, +(i || 0));
    }
    
    return () => workout.unsubscribe("builder");
  }, [exerciseId, workout, i]);

  // save to storage
  function saveWorkout() {
    if (!workout.name) {
      Alert.alert(
        "Invalid Workout Name",
        "Please enter a name for the workout.",
      );
      return;
    } else if (workoutSets.length === 0) {
      Alert.alert(
        "No Sets Added",
        "Please add at least one set to the workout.",
      );
      return;
    }

    workout.saveWorkout();
    router.navigate("/workouts");
  }

  function navigate(i?: number) {
    router.navigate({
      pathname: "/exercises/exercisePicker",
      params: { callerId: workout.id, i: i?.toString() },
    });
  }

  return (
    <DefaultPage title="New Workout" onBack={() => router.navigate("/workouts")}>
      <View style={globalStyles.formContainer}>
        <TextInput
          title="Workout Name"
          placeholder="Workout Name"
          defaultValue={workout.name}
          onChangeText={updateName}
        />
        <View style={globalStyles.scrollContainer}>
          <FlatList
            data={workoutSets}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <WorkoutSetItem item={item} onSwap={() => navigate(index)} onDelete={() => workout.removeWorkoutSet(index)} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={() => (
              <View style={{ paddingVertical: 8 }}>
                <Button label="Add Exercise" theme="primary" onPress={() => navigate(workout.length)} />
              </View>
            )}
          />
        </View>
        <Button label="Save" theme="primary" onPress={saveWorkout} />
      </View>
    </DefaultPage>
  );
}

import { router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import WorkoutSetItem from "@/components/listItems/WorkoutSetItem";
import DefaultPage from "@/components/pages/DefaultPage";

import { globalStyles } from "@/constants/styles";
import { Workout, WorkoutSet, WorkoutSetCompressed } from "@/constants/types";

import workoutService from "@/constants/storage/workouts";

type WorkoutBuilderProps = {
  id: string | undefined;
};

export default function WorkoutBuilder({ id }: WorkoutBuilderProps) {
  const workout: Workout = (id && workoutService.getWorkout(id)) || {
    id: "",
    name: "",
    sets: [],
  };

  const [name, setName] = useState("");
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);

  // save to storage
  function saveWorkout() {
    if (!name) {
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

    workoutService.addWorkout({
      id: name,
      name: name,
      sets: workoutSets.map(
        (set) =>
          ({
            id: set.exercise.id,
            sets: set.sets,
          }) as WorkoutSetCompressed,
      ),
    });
    router.navigate("/workouts");
  }

  return (
    <DefaultPage
      title="New Workout"
      theme={{ icon: "modal", path: "/workouts" }}
    >
      <View style={globalStyles.formContainer}>
        <TextInput
          title="Workout Name"
          placeholder="Workout Name"
          defaultValue={name}
          onChangeText={setName}
        />
        <View style={globalStyles.scrollContainer}>
          <FlatList
            data={workoutSets}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <WorkoutSetItem exercise={item.exercise} sets={item.sets} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={() => (
              <View style={{ paddingVertical: 8 }}>
                <Button label="Add Exercise" theme="primary" />
              </View>
            )}
          />
        </View>
        <Button label="Save" theme="primary" onPress={saveWorkout} />
      </View>
    </DefaultPage>
  );
}

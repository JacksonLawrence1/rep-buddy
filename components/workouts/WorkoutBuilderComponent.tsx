import { Alert, FlatList, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutSetItem from "./WorkoutSetItem";

import { globalStyles } from "@/constants/styles";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";

import { useWorkoutBuilder } from "@/hooks/services/useWorkoutBuilder";
import exerciseProvider from "@/services/providers/ExerciseProvider";
import { router } from "expo-router";

type WorkoutBuilderComponentProps = {
  workoutBuilder: WorkoutBuilder;
};

export default function WorkoutBuilderComponent({
  workoutBuilder,
}: WorkoutBuilderComponentProps) {
  // this reactively updates our workout sets
  const workoutSets = useWorkoutBuilder(workoutBuilder);

  // TODO: handle more complex set nodes
  function handleAddExercise(i?: number) {
    router.navigate("/workouts/builder/exercises");

    // on exercise selection, add to workout at the correct index
    const unsubscribe = exerciseProvider.subscribe((exercise) => {
      workoutBuilder.addExercise(exercise.id, i);
      unsubscribe();
    });
  }

  // save to storage
  function saveWorkout() {
    if (!workoutBuilder.name || workoutBuilder.name === "") {
      Alert.alert(
        "Invalid Workout Name",
        "Please enter a name for the workout.",
      );
      return;
    }
    
    workoutBuilder.saveWorkout();
    router.back();
  }

  return (
    <DefaultPage title="New Workout">
      <View style={globalStyles.formContainer}>
        <TextInput
          title="Workout Name"
          placeholder="Workout Name"
          defaultValue={workoutBuilder.name}
          onChangeText={(text) => workoutBuilder.name = text}
        />
        <View style={globalStyles.scrollContainer}>
          <FlatList
            data={workoutSets}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <WorkoutSetItem
                key={index}
                item={item}
                onSetChange={(set) => workoutBuilder.updateWorkoutSet(index, set)}
                onSwap={() => handleAddExercise(index)}
                onDelete={() => workoutBuilder.removeWorkoutSet(index)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={() => (
              <View style={{ paddingVertical: 8 }}>
                <Button label="Add Exercise" theme="primary" onPress={() => handleAddExercise()} />
              </View>
            )}
          />
        </View>
        <Button label="Save" theme="primary" onPress={saveWorkout} />
      </View>
    </DefaultPage>
  );
}

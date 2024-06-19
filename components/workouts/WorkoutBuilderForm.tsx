import { router } from "expo-router";
import { Alert, FlatList, View } from "react-native";
import { useDispatch } from "react-redux";

import useWorkoutSets from "@/hooks/useWorkoutSets";
import exerciseProvider from "@/services/ExerciseProvider";
import WorkoutBuilder from "@/services/builders/WorkoutBuilder";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import WorkoutSetItem from "@/components/workouts/WorkoutSetItem";

import { globalStyles } from "@/constants/styles";

type WorkoutBuilderFormProps = {
  workoutBuilder: WorkoutBuilder;
};

export default function WorkoutBuilderForm({ workoutBuilder }: WorkoutBuilderFormProps) {
  // custom hook to manage workout sets
  const { workoutSets, addExercise, replaceExercise, deleteExercise } = useWorkoutSets(workoutBuilder);

  const dispatch = useDispatch();

  // add a fresh exercise set to the workout using the exercise picker
  function onAddExercise() {
    router.navigate("/workouts/builder/exercises");

    exerciseProvider.subscribe((exercise) => {
      addExercise(exercise);
    });
  }

  // swap out an exercise for another using the exercise picker
  function onSwapExercise(i: number) {
    router.navigate("/workouts/builder/exercises");

    exerciseProvider.subscribe((exercise) => {
      replaceExercise(exercise, i);
    });
  }

  function onDeleteExercise(i: number) {
    deleteExercise(i);
  }

  async function saveWorkout() {
    // TODO: disable button while saving
    
    workoutBuilder
      .save(dispatch)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        // TODO: format alert correctly on errors
        Alert.alert("Error", error.message);

        // re-enable button
      });
  }

  return (
    <View style={globalStyles.formContainer}>
      <TextInput
        title="Workout Name"
        placeholder="Workout Name"
        defaultValue={workoutBuilder.name}
        onChangeText={(text) => (workoutBuilder.name = text)}
      />
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={workoutSets}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <WorkoutSetItem
              key={index}
              item={item}
              updateSet={(set: number) => workoutBuilder.updateWorkoutSet(index, set)}
              onSwap={() => onSwapExercise(index)}
              onDelete={() => onDeleteExercise(index)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListFooterComponent={() => (
            <View style={{ paddingVertical: 8 }}>
              <Button
                label="Add Exercise"
                theme="primary"
                onPress={onAddExercise}
              />
            </View>
          )}
        />
      </View>
      <Button label="Save" theme="primary" onPress={saveWorkout} />
    </View>
  );
}

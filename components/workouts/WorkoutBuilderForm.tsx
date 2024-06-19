import { router } from "expo-router";
import { Alert, FlatList, View } from "react-native";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";
import exerciseProvider from "@/services/ExerciseProvider";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import WorkoutSetItem from "@/components/workouts/WorkoutSetItem";

import { globalStyles } from "@/constants/styles";
import { useState } from "react";
import { WorkoutSet } from "@/constants/types";
import { useDispatch } from "react-redux";

type WorkoutBuilderFormProps = {
  workoutBuilder: WorkoutBuilder;
};

export default function WorkoutBuilderForm({ workoutBuilder }: WorkoutBuilderFormProps) {
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>(workoutBuilder.workoutSets);
  const dispatch = useDispatch();

  // add a fresh exercise set to the workout using the exercise picker
  function onAddExercise() {
    router.navigate("/workouts/builder/exercises");

    // listen for the exercise when picked
    // automatically unsubscribed when clicked back (see app/workouts/exercises.tsx)
    exerciseProvider.subscribe((exercise) => {
      // BUG: doing this duplicates the first set added so instead just copy from the builder's workoutSets
      // const workoutSet = workoutBuilder.addExercise(exercise);
      // setWorkoutSets([...workoutSets, newSet]);
      
      workoutBuilder.addExercise(exercise);
      setWorkoutSets([...workoutBuilder.workoutSets]);
    });
  }

  // swap out an exercise for another using the exercise picker
  function onSwapExercise(i: number) {
    router.navigate("/workouts/builder/exercises");

    exerciseProvider.subscribe((exercise) => {
      workoutBuilder.replaceExercise(exercise, i);

      // mutate array to update state
      setWorkoutSets(workoutSets.map((set, index) => {
        if (index === i) {
          return workoutBuilder.workoutSets[i];
        }
        return set;
      }));
    });
  }

  function onDeleteExercise(i: number) {
    workoutBuilder.removeWorkoutSet(i);
    setWorkoutSets(workoutSets.filter((_, index) => index !== i));
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

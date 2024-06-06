import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutSetItem from "./WorkoutSetItem";

import { globalStyles } from "@/constants/styles";
import { Exercise, Workout, WorkoutSetUncompressed } from "@/constants/types";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";
import exerciseProvider from "@/services/providers/ExerciseProvider";

type WorkoutBuilderComponentProps = {
  id?: string; // if given, we are editing an existing workout
  onSave: (workout: Workout) => void;
  onAddExercise: () => void; // when user clicks new set button
};

export default function WorkoutBuilderComponent({
  id,
  onSave,
  onAddExercise,
}: WorkoutBuilderComponentProps) {
  const workout = useMemo(() => new WorkoutBuilder(id), [id]);
  const [workoutSets, setWorkoutSets] = useState<WorkoutSetUncompressed[]>(
    workout.workout.sets,
  );

  function handleAddExercise(i: number) {
    onAddExercise();
    exerciseProvider.subscribe(i, (exercise: Exercise) => {
      workout.addExercise(exercise.id, i); 
      exerciseProvider.unsubscribe(i);
    });
  }

  // PERF: this could use some optimization
  useEffect(() => {
    function updateWorkoutSets(set: WorkoutSetUncompressed[]) {
      setWorkoutSets(set);
    }

    // subscribe for updates in case we want to remove sets
    workout.subscribe("workoutBuilder", updateWorkoutSets);

    return () => {
      workout.unsubscribe("workoutBuilder");

      // ensure we unsubscribe from all exercise providers
      for (let i = 0; i < workout.setsLength; i++) {
        exerciseProvider.unsubscribe(i);
      }
    }
  }, [workout]);

  // save to storage
  function saveWorkout() {
    if (!workout.name) {
      Alert.alert(
        "Invalid Workout Name",
        "Please enter a name for the workout.",
      );
      return;
    }

    const savedWorkout: Workout = workout.saveWorkout();
    onSave(savedWorkout);
  }

  return (
    <DefaultPage title="New Workout">
      <View style={globalStyles.formContainer}>
        <TextInput
          title="Workout Name"
          placeholder="Workout Name"
          defaultValue={workout.name}
          onChangeText={workout.updateName.bind(workout)}
        />
        <View style={globalStyles.scrollContainer}>
          <FlatList
            data={workoutSets}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <WorkoutSetItem
                key={index}
                item={item}
                onDelete={workout.removeWorkoutSet.bind(workout, index)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={() => (
              <View style={{ paddingVertical: 8 }}>
                <Button label="Add Exercise" theme="primary" onPress={() => handleAddExercise(workout.setsLength)} />
              </View>
            )}
          />
        </View>
        <Button label="Save" theme="primary" onPress={saveWorkout} />
      </View>
    </DefaultPage>
  );
}

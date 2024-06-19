import { router } from "expo-router";
import { FlatList, View } from "react-native";

import exerciseProvider from "@/services/ExerciseProvider";

import Button from "../buttons/Button";
import LogExercise from "./exercise/LogExercise";
import Timer from "./Timer";

import { globalStyles } from "@/constants/styles";
import useWorkoutLog from "@/hooks/useWorkoutLog";
import LogBuilder from "@/services/builders/LogBuilder";

type WorkoutLogProps = {
  log: LogBuilder;
};

export default function LogContent({ log }: WorkoutLogProps) {
  const { exercises, addExercise, swapExercise, removeExercise } = useWorkoutLog(log);

  function onSwapExercise(index: number) {
    router.navigate({ pathname: "workouts/builder/exercises" });
    exerciseProvider.subscribe((exercise) => {
      swapExercise(exercise, index);
    })
  }

  function onAddExercise() {
    router.navigate({ pathname: "workouts/builder/exercises" });
    exerciseProvider.subscribe((exercise) => {
      addExercise(exercise);
    })
  }

  function onDeleteExercise(index: number) {
    removeExercise(index);
  }

  return (
    <>
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={exercises}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <LogExercise key={index} index={index} exerciseSet={item} onDelete={onDeleteExercise} onSwap={onSwapExercise} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListFooterComponent={
          <View style={{paddingVertical: 8}}>
              <Button label="Add Exercise" icon="plus" theme="primary" onPress={onAddExercise} />
          </View>
          }
        />
      </View>
      <Timer />
    </>
  );
}

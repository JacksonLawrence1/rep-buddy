import { FlatList, View } from "react-native";

import DefaultPage from "@/components/pages/DefaultPage";
import LogExerciseSet from "./LogExerciseSet";
import Timer from "./Timer";

import { globalStyles } from "@/constants/styles";

import LogBuilder from "@/services/builders/LogBuilder";
import Button from "../buttons/Button";
import exerciseProvider from "@/services/ExerciseProvider";
import { router } from "expo-router";

type WorkoutLogProps = {
  log: LogBuilder;
};

export default function Log({ log }: WorkoutLogProps) {
  function onSwapExercise(index: number) {
    router.navigate({ pathname: "workouts/builder/exercises" });
    const unsubscribe = exerciseProvider.subscribe((exercise) => {
      log.swapExercises(index, exercise);
      unsubscribe(); 
    })
  }

  function onAddExercise() {
    router.navigate({ pathname: "workouts/builder/exercises" });
    const unsubscribe = exerciseProvider.subscribe((exercise) => {
      log.addExercise(exercise);
      unsubscribe(); 
    })
  }

  return (
    <DefaultPage title={log.name}>
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={exerciseSets}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <LogExerciseSet key={index} index={index} exerciseSet={item} onSwap={onSwapExercise} />
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
    </DefaultPage>
  );
}

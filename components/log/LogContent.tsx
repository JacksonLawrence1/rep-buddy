import { FlatList, View } from "react-native";

import useWorkoutLog from "@/hooks/useWorkoutLog";

import LogBuilder from "@/services/builders/LogBuilder";

import Button from "@/components/buttons/Button";
import LogExercise from "@/components/log/exercise/LogExercise";
import Timer from "@/components/log/Timer";

import { globalStyles } from "@/constants/styles";

type WorkoutLogProps = {
  log: LogBuilder;
};

export default function LogContent({ log }: WorkoutLogProps) {
  const { exercises, pickExercise, removeExercise } = useWorkoutLog(log);

  function onSwapExercise(index: number) {
    pickExercise((exercise) => log.swapExercise(exercise, index));
  }

  function onAddExercise() {
    pickExercise((exercise) => log.addExercise(exercise));
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

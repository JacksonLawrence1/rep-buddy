import { FlatList, StyleSheet, Text, View } from "react-native";

import useWorkoutLog from "@/hooks/useWorkoutLog";

import LogBuilder from "@/services/builders/LogBuilder";

import Button from "@/components/buttons/Button";
import LogExercise from "@/components/log/exercise/LogExercise";

import settings from "@/constants/settings";
import { globalStyles } from "@/constants/styles";
import LogFooter from "./LogFooter";

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
      <View style={styles.titleContainer}>
        <Text style={globalStyles.listTitle}>{log.name}</Text>
        {log.date && <Text style={globalStyles.dateTitle}>{settings.convertDateObject(log.date)}</Text>}
      </View>
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
      <LogFooter log={log} />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    marginVertical: -8,
    flexWrap: "wrap",
    alignSelf: "stretch",
  },
});

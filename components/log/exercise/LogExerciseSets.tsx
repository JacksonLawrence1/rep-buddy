import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

import LogExerciseSetRow from "@/components/log/exercise/LogExerciseSetRow";

import { colors } from "@/constants/colors";
import { LogSet } from "@/constants/types";

interface LogExerciseSetsProps {
  sets: LogSet[];
  i: number;
}

export default function LogExerciseSets({ i }: LogExerciseSetsProps) {
  const log: LogBuilder = useContext(LogContext) as LogBuilder;
  const [sets, setSets] = useState<LogSet[]>(log?.sets[i].sets || []);

  if (!log) {
    return null;
  }

  function onAddSet() {
    log.addSet(i);
    setSets([...log.sets[i].sets]);
  }

  function onRemoveSet(i: number, j: number) {
    log.removeSet(i, j);
    setSets([...log.sets[i].sets]);
  }

  return (
    <View style={styles.setsContainer}>
      <FlatList
        data={sets}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <LogExerciseSetRow
            key={`${item.weight},${item.reps}`}
            reps={item.reps}
            weight={item.weight}
            i={i}
            j={index}
            onRemoveSet={onRemoveSet}
          />
        )}
      />
      <View style={styles.anotherSetContainer}>
        <Text style={[styles.text, {textTransform: 'uppercase'}]}>Add Set</Text>
        <Pressable style={styles.addSetButton} onPress={onAddSet}>
          <FontAwesome5 name="plus" size={16} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addSetButton: {
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.greenTint,
  },
  anotherSetContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    gap: 24,
    borderTopWidth: 1,
    marginTop: 8,
    borderColor: colors.border,
  },
  setsContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 4,
  },
  text: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
});

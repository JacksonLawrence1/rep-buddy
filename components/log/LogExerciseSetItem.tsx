import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

import { colors } from "@/constants/colors";
import settings from "@/constants/settings";
import { LogSet } from "@/constants/types";

interface WorkoutLogSetItemProps {
  sets: LogSet[];
  i: number;
}

interface SetItemProps {
  log: LogBuilder;
  i: number;
  j: number;
  reps: string;
  weight: string;
}

function SetItem({ log, i, j, reps, weight }: SetItemProps) {
  const onWeightChange = (text: string) => log.updateSetWeight(i, j, text);
  const onRepsChange = (text: string) => log.updateSetReps(i, j, text);

  return (
    <View style={styles.setContainer}>
      <View style={styles.setItem}>
        <Text style={styles.text}>W: </Text>
        <TextInput
          defaultValue={weight}
          inputMode="numeric"
          style={styles.inputContainer}
          onBlur={(e) => onWeightChange(e.nativeEvent.text || "")}
        />
        <Text style={styles.text}>{settings.weightUnit}</Text>
      </View>
      <View style={styles.setItem}>
        <Text style={styles.text}>R: </Text>
        <TextInput
          placeholderTextColor={colors.textDark}
          defaultValue={reps}
          inputMode="numeric"
          style={styles.inputContainer}
          onBlur={(e) => onRepsChange(e.nativeEvent.text || "")}
        />
      </View>
      <Pressable style={styles.icon} onPress={() => log.removeSet(i, j)}>
        <FontAwesome5 name="trash" size={16} color={colors.error} />
      </Pressable>
    </View>
  );
}

export default function LogExerciseSetItem({ i }: WorkoutLogSetItemProps) {
  const log: LogBuilder | null = useContext(LogContext);

  if (!log) {
    return null;
  }

  return (
    <View style={styles.setsContainer}>
      <FlatList
        data={log.sets[i].sets}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SetItem
            key={`${item.weight},${item.reps}`}
            log={log}
            reps={item.reps?.toString() || ""}
            weight={item.weight?.toString() || ""}
            i={i}
            j={index}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  setContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingVertical: 2,
    gap: 8,
  },
  setsContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 4,
  },
  icon: {
    paddingHorizontal: 8,
    marginLeft: "auto",
  },
  inputContainer: {
    flexDirection: "row",
    textAlign: "center",
    padding: 6,
    borderRadius: 8,
    backgroundColor: colors.backgroundDark,
    color: colors.text,
    fontFamily: "Rubik-Regular",
    width: 42,
  },
  setItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 4,
    paddingLeft: 8,
    paddingRight: 16,
    borderRightWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
});

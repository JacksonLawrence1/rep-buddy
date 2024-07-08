import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

import { colors } from "@/constants/colors";
import settings from "@/constants/settings";
import { useContext } from "react";

interface LogExerciseSetRowProps {
  i: number;
  j: number;
  reps: number | null;
  weight: number | null;
  onRemoveSet: (i: number, j: number) => void;
}

export default function LogExerciseSetRow({ i, j, reps, weight, onRemoveSet }: LogExerciseSetRowProps) {
  const log: LogBuilder = useContext(LogContext) as LogBuilder;

  // updates the log without needing re-renders
  const onWeightChange = (text: string) => log.updateSetWeight(i, j, text);
  const onRepsChange = (text: string) => log.updateSetReps(i, j, text);

  return (
    <View style={styles.setContainer}>
      <View style={styles.setColumn}>
        <Text style={styles.text}>{j + 1}</Text>
      </View>
      <View style={styles.setItem}>
        <Text style={styles.text}>W: </Text>
        <TextInput
          defaultValue={weight ? `${weight}` : ""}
          inputMode="numeric"
          style={styles.inputContainer}
          onEndEditing={(e) => onWeightChange(e.nativeEvent.text || "")}
        />
        <Text style={styles.text}>{settings.weightUnit}</Text>
      </View>
      <View style={styles.setItem}>
        <Text style={styles.text}>R: </Text>
        <TextInput
          placeholderTextColor={colors.textDark}
          defaultValue={reps ? `${reps}` : ""}
          inputMode="numeric"
          style={styles.inputContainer}
          onEndEditing={(e) => onRepsChange(e.nativeEvent.text || "")}
        />
      </View>
      <Pressable style={styles.icon} onPress={() => onRemoveSet(i, j)}>
        <FontAwesome5 name="trash" size={16} color={colors.error} />
      </Pressable>
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
  setColumn: {
    height: "100%",
    width: 32,
    paddingLeft: 8,
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: colors.border,
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

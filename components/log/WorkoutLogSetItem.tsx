import { View, Text, StyleSheet, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { FlatList } from "react-native-gesture-handler";
import Button from "../buttons/Button";

import { colors } from "@/constants/colors";
import { WorkoutLogSet } from "@/constants/types";

interface WorkoutLogSetItemProps {
  sets: WorkoutLogSet[];
  i: number;
}

interface SetItemProps {
  i: number;
  j: number;
  reps: number | null;
  weight: number | null;
}

function SetItem({ reps, weight, i, j }: SetItemProps) {
  return (
    <View style={styles.setContainer}>
      <View style={styles.setItem}>
        <Text style={styles.text}>Weight: {weight}</Text>
        <TextInput style={styles.inputContainer} />
      </View>
      <View style={styles.setItem}>
        <Text style={styles.text}>Reps: {reps}</Text>
        <TextInput style={styles.inputContainer} />
      </View>
      <FontAwesome5 name="trash" size={16} color={colors.error} />
    </View>
  );
}

export default function WorkoutLogSetItem({ sets, i }: WorkoutLogSetItemProps) {
  return (
    <View style={styles.setsContainer}>
      <FlatList
        data={sets}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SetItem reps={item.reps} weight={item.weight} i={i} j={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  setContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    gap: 16,
  },
  setsContainer: {
    width: "100%",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundDark,
    color: colors.text,
    width: 48,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: "Rubik-Regular",
  },
  setItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    borderRadius: 8,
    gap: 8,
  },
  text: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
  }
});

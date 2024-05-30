import { StyleSheet, View, Text } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import TextInput from "@/components/inputs/TextInput";
import Tag from "@/components/Tag";
import Button from "@/components/Buttons/Button";

import { Colors } from "@/constants/Colors";

const testMuscleGroups = [
  { label: "Chest" },
  { label: "Back" },
  { label: "Legs" },
  { label: "Arms" },
  { label: "Shoulders" },
  { label: "Abs" },
  { label: "Cardio" },
  { label: "Full Body" },
];

export default function addExercise() {
  return (
    <DefaultPage title="New Exercise" back>
      <View style={styles.newExerciseContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Exercise Name:</Text>
          <TextInput placeholder="Enter exercise name" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Muscle Groups:</Text>
          <View style={styles.muscleGroupsContainer}>
            {testMuscleGroups.map((muscleGroup, i) => <Tag key={i} label={muscleGroup.label} />)}
          </View>
        </View>
      </View>
      <Button theme="primary" label="Save" />
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  inputContainer: {
    paddingVertical: 16,
  },
  newExerciseContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundDark, 
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

import { router } from "expo-router";
import { useState } from "react";

import { StyleSheet, View } from "react-native";

import Button from "@/components/Buttons/Button";
import DefaultPage from "@/components/DefaultPage";
import InputField from "@/components/inputs/InputField";
import TextInput from "@/components/inputs/TextInput";
import Tag from "@/components/Tag";

import { colors } from "@/constants/colors";
import { MuscleGroup, MuscleGroups, MuscleGroupStrings } from "@/constants/enums/muscleGroups";

import exerciseService from "@/constants/storage/exercises";

export default function AddExercise() {
  const [exerciseName, setExerciseName] = useState("Exercise Name");
  const chosenMuscleGroupSet: Set<MuscleGroupStrings> = new Set();

  function updateExerciseName(text: string) {
    setExerciseName(text);
  }

  async function saveExercise() {
    await exerciseService.addExercise({ 
      id: exerciseName, 
      name: exerciseName, 
      muscleGroups: Array.from(chosenMuscleGroupSet).map((group) => MuscleGroup[group])});
    router.back();
  }

  return (
    <DefaultPage title="New Exercise" back>
      <View style={styles.newExerciseContainer}>
        <InputField title="Exercise Name">
          <TextInput placeholder="Enter exercise name" onChangeText={updateExerciseName} />
        </InputField>
        <InputField title={"Muscle Groups"}>
          <View style={styles.muscleGroupsContainer}>
            {MuscleGroups.map((muscleGroup, i) => <Tag key={i} label={muscleGroup} setToAddTo={chosenMuscleGroupSet} />)}
          </View>
        </InputField>
      </View>
      <Button theme="primary" label="Save" onPress={saveExercise} />
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  newExerciseContainer: {
    flex: 1,
    backgroundColor: colors.backgroundDark, 
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

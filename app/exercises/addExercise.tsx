import { useState } from "react";
import { router } from "expo-router";

import { StyleSheet, View } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import TextInput from "@/components/inputs/TextInput";
import Tag from "@/components/Tag";
import Button from "@/components/Buttons/Button";
import InputField from "@/components/inputs/InputField";

import { Colors } from "@/constants/Colors";
import MuscleGroup from "@/constants/enums/muscleGroups";

import exerciseService from "@/constants/storage/exercises";

export default function addExercise() {
  const [exerciseName, setExerciseName] = useState("Exercise Name");

  function updateExerciseName(text: string) {
    setExerciseName(text);
  }

  async function saveExercise() {
    await exerciseService.addExercise({ id: exerciseName, name: exerciseName, muscleGroups: [] });
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
            {MuscleGroup.map((muscleGroup, i) => <Tag key={i} label={muscleGroup} />)}
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
    alignSelf: 'stretch', 
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

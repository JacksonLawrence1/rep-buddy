import { router } from "expo-router";

import { Alert, StyleSheet, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import InputField from "@/components/inputs/InputField";
import DefaultPage from "@/components/pages/DefaultPage";
import Tag from "@/components/primitives/Tag";

import { colors } from "@/constants/colors";
import { MuscleGroup, MuscleGroups, MuscleGroupStrings } from "@/constants/enums/muscleGroups";

import exerciseService from "@/constants/storage/exercises";

export default function AddExercise() {
  const chosenMuscleGroupSet: Set<MuscleGroupStrings> = new Set();
  let exerciseName: string;

  function updateExerciseName(text: string) {
    exerciseName = text;
  }

  async function saveExercise() {
    if (exerciseName === undefined || exerciseName === "") {
      Alert.alert("Invalid Exercise Name", "Please enter a name for the exercise.");
      return;
    }

    await exerciseService.addExercise({ 
      id: exerciseName, 
      name: exerciseName, 
      muscleGroups: Array.from(chosenMuscleGroupSet).map((group) => MuscleGroup[group])});
    router.back();
  }

  return (
    <DefaultPage title="New Exercise" back>
      <View style={styles.newExerciseContainer}>
        <TextInput title={"Exercise Name"} placeholder="Enter exercise name" onChangeText={updateExerciseName} />

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

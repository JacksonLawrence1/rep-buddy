import { router } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import InputField from "@/components/inputs/InputField";
import DefaultPage from "@/components/pages/DefaultPage";
import TagEnum from "@/components/primitives/TagEnum";

import { globalStyles } from "@/constants/styles";
import { MuscleGroupValues } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import exerciseService from "@/constants/storage/exercises";

interface ExerciseBuilderProps {
  id?: string;
}

export default function ExerciseBuilder({ id }: ExerciseBuilderProps) {
  const exercise: Exercise = id && exerciseService.getExercise(id) || {
    id: "",
    name: "",
    muscleGroups: new Set(),
  };

  // every time user types, update exercise name
  function updateExerciseName(text: string) {
    exercise.name = text;
  }

  async function saveExercise() {
    // prevent saving if no exercise name (but allow no muscle groups)
    if (exercise.name === undefined || exercise.name === "") {
      Alert.alert(
        "Invalid Exercise Name",
        "Please enter a name for the exercise.",
      );
      return;
    }

    // TODO: Replace this with proper ID generation
    if (exercise.id === "") {
      exercise.id = exercise.name;
    }

    // add exercise to storage
    await exerciseService.addExercise(exercise);
    router.navigate({ pathname: "/exercises" });
  }

  return (
    <DefaultPage title="New Exercise" theme={{icon: "modal", path: "/exercises"}}>
      <View style={globalStyles.formContainer}>
        <TextInput
          title={"Exercise Name"}
          placeholder="Enter exercise name"
          onChangeText={updateExerciseName}
          defaultValue={exercise.name}
        />
        <View style={globalStyles.scrollContainer}>
          <InputField title={"Muscle Groups"}>
            <View style={styles.muscleGroupsContainer}>
              {MuscleGroupValues.map((muscleGroup, i) => (
                <TagEnum
                  key={i}
                  value={muscleGroup}
                  enabledOnStart={exercise.muscleGroups.has(muscleGroup)}
                  setToAddTo={exercise.muscleGroups}
                />
              ))}
            </View>
          </InputField>
        </View>
        <Button theme="primary" label="Save" onPress={saveExercise} />
      </View>
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

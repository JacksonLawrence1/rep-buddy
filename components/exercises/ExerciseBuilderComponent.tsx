import { Alert, StyleSheet, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import InputField from "@/components/inputs/InputField";
import DefaultPage from "@/components/pages/DefaultPage";
import TagEnum from "@/components/primitives/TagEnum";

import { globalStyles } from "@/constants/styles";
import { MuscleGroupValues } from "@/constants/enums/muscleGroups";
import { Exercise } from "@/constants/types";

import ExerciseBuilder from "@/services/builders/ExerciseBuilder";

interface ExerciseBuilderComponentProps {
  id?: string; // optionally pass in an id to edit an exercise
  onSave: (exercise: Exercise) => void; // callback to save exercise
}

export default function ExerciseBuilderComponent({ id, onSave }: ExerciseBuilderComponentProps) {
  const exercise = new ExerciseBuilder(id);

  async function saveExercise() {
    // prevent saving if no exercise name (but allow no muscle groups)
    if (!exercise.name || exercise.name === "") {
      Alert.alert(
        "Invalid Exercise Name",
        "Please enter a name for the exercise.",
      );
      return;
    }

    const savedExercise: Exercise = exercise.saveExercise();
    onSave(savedExercise);
  }

  return (
    <DefaultPage title="New Exercise" theme={"modal"}>
      <View style={globalStyles.formContainer}>
        <TextInput
          title={"Exercise Name"}
          placeholder="Enter exercise name"
          onChangeText={exercise.updateName.bind(exercise)}
          defaultValue={exercise.name}
        />
        <View style={globalStyles.scrollContainer}>
          <InputField title={"Muscle Groups"}>
            <View style={styles.muscleGroupsContainer}>
              {MuscleGroupValues.map((muscleGroup, i) => (
                <TagEnum
                  key={i}
                  value={muscleGroup}
                  enabledOnStart={exercise.hasMuscleGroup(muscleGroup)}
                  onPress={exercise.toggleMuscleGroup.bind(exercise, muscleGroup)}
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

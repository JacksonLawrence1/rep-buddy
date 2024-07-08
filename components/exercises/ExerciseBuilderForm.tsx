import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import ExerciseBuilder from "@/services/builders/ExerciseBuilder";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import InputField from "@/components/inputs/InputField";
import TagEnum from "@/components/primitives/TagEnum";

import { MuscleGroupValues } from "@/constants/enums/muscleGroups";
import { globalStyles } from "@/constants/styles";
import { useDispatch } from "react-redux";
import { showAlert } from "@/features/alerts";
import { useState } from "react";

interface ExerciseBuilderFormProps {
  exercise: ExerciseBuilder;
}

export default function ExerciseBuilderForm({
  exercise,
}: ExerciseBuilderFormProps) {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function saveExercise() {
    setButtonDisabled(true);

    exercise
      .save(dispatch)
      .then(() => {
        router.back(); 
      })
      .catch((error) => {
        dispatch(
          showAlert({
            title: "Error while saving exercise",
            description: error.message,
          }),
        );
      }).finally(() => {
        setButtonDisabled(false); // re-enable the button after either success or failure
      });
  }

  return (
    <View style={globalStyles.formContainer}>
      <TextInput
        title={"Exercise Name"}
        placeholder="Enter exercise name"
        onChangeText={(text) => (exercise.name = text)}
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
      <Button
        theme="primary"
        label="Save"
        disabled={buttonDisabled}
        onPress={saveExercise}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

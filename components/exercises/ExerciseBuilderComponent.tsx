import { Alert, StyleSheet, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import InputField from "@/components/inputs/InputField";
import DefaultPage from "@/components/pages/DefaultPage";
import TagEnum from "@/components/primitives/TagEnum";

import { globalStyles } from "@/constants/styles";
import { MuscleGroupValues } from "@/constants/enums/muscleGroups";

import ExerciseBuilder from "@/services/builders/ExerciseBuilder";
import { useDispatch } from "react-redux";
import { router } from "expo-router";

interface ExerciseBuilderComponentProps {
  id?: string; // optionally pass in an id to edit an exercise
}

export default function ExerciseBuilderComponent({ id }: ExerciseBuilderComponentProps) {
  const exercise = new ExerciseBuilder(id);
  const dispatcher = useDispatch();

  async function saveExercise() {
    // TODO: validation from the exercise builder
    const error = exercise.save(dispatcher);

    if (error) {
      Alert.alert(error.title, error.message);
      return;
    }

    router.back();
  }

  return (
    <DefaultPage title="New Exercise" theme={"modal"}>
      <View style={globalStyles.formContainer}>
        <TextInput
          title={"Exercise Name"}
          placeholder="Enter exercise name"
          onChangeText={(text) => exercise.name = text}
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

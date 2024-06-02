import { useState } from "react";
import { View } from "react-native";

import Button from "@/components/buttons/Button";
import InputField from "@/components/inputs/InputField";
import { NumericInput } from "@/components/inputs/FormFields";

import ExerciseItem from "@/components/listItems/ExerciseItem";
import ExercisePicker from "@/components/forms/ExercisePicker";

import { Exercise } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

interface ExerciseFormProps {
  onAddExercise: (exercise: Exercise) => void;
  onSetsChange: (text: string) => void;
  saveExerciseSet: () => void;
}

export default function WorkoutSetBuilderForm({
  onAddExercise,
  onSetsChange,
  saveExerciseSet,
}: ExerciseFormProps) {
  const [modalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  const [exercise, setExercise] = useState<Exercise>();

  function addExercise(exercise: Exercise) {
    setExercise(exercise);
    onAddExercise(exercise);
  }

  return (
    <View style={globalStyles.formContainer}>
      {modalVisible && (
        <ExercisePicker
          visibility={modalVisible}
          toggleVisibility={toggleModal}
          onPress={addExercise}
        />
      )}
      <InputField title="Exercise">
        <View style={{ maxHeight: 52 }}>
          {exercise ? (
            <ExerciseItem key={exercise.id} {...exercise} />
          ) : (
            <Button
              onPress={toggleModal}
              label="Choose Exercise"
              theme="primary"
              icon="plus"
            />
          )}
        </View>
      </InputField>
      <NumericInput
        title={"Minimum Sets"}
        onChangeText={onSetsChange}
        placeholder="Number of Sets"
      />
      <Button theme="primary" label="Save" onPress={saveExerciseSet} />
    </View>
  );
}

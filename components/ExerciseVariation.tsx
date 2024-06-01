import Button from "@/components/Buttons/Button";
import InputField from "@/components/inputs/InputField";
import { Exercise } from "@/constants/types";
import { useState } from "react";
import NumericInput from "./inputs/NumericInput";
import ExerciseBase from "./listItems/ExerciseItem";
import ChooseExercise from "./modals/chooseExercise";

interface ExerciseVariationProps {
  route?: any;
  choice: string;
}

export default function ExerciseVariation({ choice }: ExerciseVariationProps) {
  const [modalVisible, setModalVisible] = useState(false);
  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  const [exercises, setExercises] = useState<Exercise[]>([]);
  function addExercise(exercise: Exercise) {
    setExercises([...exercises, exercise]);
  }

  return (
    <>
      {modalVisible && <ChooseExercise visibility={modalVisible} toggleVisibility={toggleModal} onPress={addExercise} />}
      <InputField title="Exercise">
        {exercises.length > 0 ? exercises.map(exercise => {
          return <ExerciseBase key={exercise.id} size={20} exerciseName={exercise.name} />;
        }) : <Button onPress={toggleModal} label="Choose Exercise" theme="primary" icon="plus" />}
      </InputField>
      <InputField title="Minimum Sets">
        <NumericInput placeholder="Number of Sets" />
      </InputField>
    </>
  );
}

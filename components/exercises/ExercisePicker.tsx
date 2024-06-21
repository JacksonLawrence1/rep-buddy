import ExerciseList from "@/components/exercises/ExerciseList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";

import { Exercise } from "@/constants/types";

import exerciseProvider from "@/services/ExerciseProvider";

import { useState } from "react";
import { router } from "expo-router";

interface ChooseExerciseProps {
  title?: string;
}

// when we exit the exercise picker
function onExit() {
  exerciseProvider.clearSubscribers();
}

export default function ExercisePicker({ title }: ChooseExerciseProps) {
  // wrap the onPress function to also call the exercise provider
  const handleExerciseSelection = (exercise: Exercise) => {
    exerciseProvider.pickExercise(exercise);
    router.back(); // go back to the previous screen
  }

  const onNewExercise = () => {
    router.navigate("/exercises/new")
  }

  const [filter, setFilter] = useState("");

  return (
    <DefaultPage title={title || "Your Exercises"} callback={onExit}>
      <Searchbar
        placeholder="Search for an exercise"
        onChangeText={setFilter}
      />
      <ExerciseList filter={filter} onItemPress={handleExerciseSelection} />
      <Button label="Add New Exercise" theme="primary" icon={"plus"} onPress={onNewExercise} />
    </DefaultPage>
  );
}

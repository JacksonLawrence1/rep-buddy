import { router } from "expo-router";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/app/store";

import { deleteExercise } from "@/features/exercises";
import exerciseDatabase from "@/services/database/Exercises";

import ListItem from "@/components/primitives/ListItem";
import { Delete, Edit, History } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { Exercise } from "@/constants/types";
import { showAlert } from "@/features/alerts";
import { useState } from "react";
import DeleteAlert from "../primitives/DeleteAlert";

interface ExerciseItemProps {
  exercise: Exercise;
  onPress?: () => void;
  edit?: boolean; // include edit option
  del?: boolean; // include delete option
  history?: boolean; // include history option
}

export default function ExerciseItem({
  exercise,
  onPress,
  edit = false,
  del = false,
  history = false,
}: ExerciseItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteAlert, setDeleteAlert] = useState(false);

  async function onDelete() {
    try {
      await exerciseDatabase.deleteExercise(exercise.id);
      dispatch(deleteExercise(exercise.id));
    } catch (error) {
      dispatch(showAlert({ title: "Error while deleting exercise", description: `Could not delete exercise: ${error}` }));
    }
  }

  // what we do when we want to edit an exercise
  function onEdit() {
    router.navigate({
      pathname: "/exercises/edit/[id]",
      params: { id: exercise.id },
    });
  }

  function onHistory() {
    router.navigate({
      pathname: "/exercises/history/[id]",
      params: { id: exercise.id },
    });
  }

  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [];

  if (edit) {
    popoutMenuOptions.unshift(<Edit key={0} onPress={onEdit} />);
  }

  if (history) {
    popoutMenuOptions.unshift(<History key={1} onPress={onHistory} />);
  }

  // add menu options
  if (del) {
    popoutMenuOptions.unshift(<Delete key={2} onPress={() => setDeleteAlert(true)} />);
  }

  return (
    <>
      <DeleteAlert visible={deleteAlert} setVisible={setDeleteAlert} deleteFunction={onDelete} label="Exercise" />
      <ListItem
        label={exercise.name}
        onPress={onPress}
        popoutMenuOptions={{ options: popoutMenuOptions }}
        backgroundColor={colors.tertiary}
      />
    </>
  );
}

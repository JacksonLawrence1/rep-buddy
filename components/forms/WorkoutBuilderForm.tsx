import { router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, View } from "react-native";

import Button from "@/components/buttons/Button";
import { TextInput } from "@/components/inputs/FormFields";
import WorkoutSetItem from "@/components/listItems/WorkoutSetItem";
import WorkoutSetBuilderPage from "@/components/forms/WorkoutSetBuilderPage";

import { globalStyles } from "@/constants/styles";
import { WorkoutSet, WorkoutSetCompressed } from "@/constants/types";

import workoutService from "@/constants/storage/workouts";

export default function WorkoutBuilderForm() {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  const [name, setName] = useState(""); // [2
  const handleWorkoutNameChange = (text: string) => setName(text);

  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]); // [1
  // add workout set to workout and update state
  const addWorkoutSet = (workoutSet: WorkoutSet) =>
    setWorkoutSets([...workoutSets, workoutSet]);

  // save to storage
  function saveWorkout() {
    if (!name) {
      Alert.alert(
        "Invalid Workout Name",
        "Please enter a name for the workout.",
      );
      return;
    } else if (workoutSets.length === 0) {
      Alert.alert(
        "No Sets Added",
        "Please add at least one set to the workout.",
      );
      return;
    }

    workoutService.addWorkout({
      id: name,
      name: name,
      sets: workoutSets.map(
        (set) =>
          ({
            exerciseId: set.exercise.id,
            sets: set.sets,
          }) as WorkoutSetCompressed,
      ),
    });
    router.navigate("/workouts");
  }

  return (
    <View style={globalStyles.formContainer}>
      {modalVisible && (
        <WorkoutSetBuilderPage
          visibility={modalVisible}
          toggleVisibility={toggleModal}
          onAddSet={addWorkoutSet}
        />
      )}
      <TextInput
        title="Workout Name"
        placeholder="Workout Name"
        onChangeText={handleWorkoutNameChange}
      />
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={workoutSets}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <WorkoutSetItem exercise={item.exercise} sets={item.sets} />}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListFooterComponent={() => (
            <View style={{ paddingVertical: 8 }}>
              <Button label="Add Set" theme="primary" onPress={toggleModal} />
            </View>
          )}
        />
      </View>
      <Button label="Save" theme="primary" onPress={saveWorkout} />
    </View>
  );
}

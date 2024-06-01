import { FlatList, View, Modal, SafeAreaView, StyleSheet, Text } from "react-native";

import Searchbar from "@/components/inputs/Searchbar";
import ExerciseItem from "@/components/listItems/ExerciseItem";

import { colors } from "@/constants/colors";
import exerciseService from "@/constants/storage/exercises";
import { globalStyles } from "@/constants/styles";
import IconButton from "../Buttons/IconButton";

import { Exercise } from "@/constants/types";

interface ChooseExerciseProps {
  visibility: boolean;
  toggleVisibility: () => void;
  onPress: (exercise: Exercise) => void;
}

export default function ChooseExercise({
  visibility,
  toggleVisibility,
  onPress,
}: ChooseExerciseProps) {
  const exercises = exerciseService.exercises;

  return (
    <Modal transparent={true} visible={visibility} animationType="slide" presentationStyle="overFullScreen">
      <SafeAreaView style={styles.modalContainer}>
        <View style={[globalStyles.contentContainer, {padding: 12}]}>
          <View style={globalStyles.titleContainer}>
            <IconButton onPress={toggleVisibility} icon="times" />
            <Text style={globalStyles.title}>Choose Exercise</Text>
            <IconButton icon="times" disabled={true} />
          </View>
          <Searchbar placeholder="Search for Exercise" />
          <View style={globalStyles.scrollContainer}>
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <ExerciseItem onPress={() => {
                  onPress(item);
                  toggleVisibility();
                }} exerciseName={item.name} />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 60,
    borderWidth: 2,
    borderColor: colors.backgroundDark,
  },
});

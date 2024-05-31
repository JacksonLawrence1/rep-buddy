import { StyleSheet, View } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import Button from "@/components/Buttons/Button";
import LinkButton from "@/components/Buttons/LinkButton";

import { Colors } from "@/constants/Colors";

export default function Index() {
  // TODO: Allow changing title at the top
  return (
    <DefaultPage title="New Workout" back>
      <View style={styles.exerciseContainer}>
        {/* When user adds exercise, they will show up here */}

        <LinkButton
          href="/workouts/workoutTemplate/addExercise"
          label="Add New Exercise"
          theme="primary"
          icon="plus"
        />
      </View>
      <Button label="Save" theme="primary" />
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundDark, 
    borderRadius: 8,
    padding: 8,
    width: "100%",
  },
});

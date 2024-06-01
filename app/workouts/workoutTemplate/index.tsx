import { View } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import Button from "@/components/Buttons/Button";
import LinkButton from "@/components/Buttons/LinkButton";

import { globalStyles } from "@/constants/styles";

export default function Index() {
  // TODO: Allow changing title at the top
  return (
    <DefaultPage title="New Workout" back>
      <View style={globalStyles.scrollContainer}>
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
  );}

import { View } from "react-native";

import Button from "@/components/buttons/Button";
import ExerciseItem from "@/components/listItems/ExerciseItem";
import PageItemList from "@/components/pages/PageItemList";

import exerciseService from "@/constants/storage/exercises";
import { router } from "expo-router";
const service: string = "exercisesPage";

export default function Index() {
  function ToggleExerciseFormButton(): React.ReactNode {
    // navigate to dynamic route, with id -1 to signal not editing
    return (
      <Button
        label="Add Exercise"
        theme="primary"
        icon="plus"
        onPress={() => router.navigate({ pathname: "exercises/exerciseBuilder" })}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <PageItemList
        callerId={service}
        title="Your Exercises"
        searchPlaceholder="Search for Exercise"
        backRoute="/"
        service={exerciseService}
        ListComponent={ExerciseItem}
        FooterComponent={ToggleExerciseFormButton()}
        seperatorHeight={4}
      />
    </View>
  );
}

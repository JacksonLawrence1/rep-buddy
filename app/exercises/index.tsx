import { StyleSheet, FlatList, View } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import Searchbar from "@/components/inputs/Searchbar";
import LinkButton from "@/components/Buttons/LinkButton";
import ExerciseBase from "@/components/ExerciseBase";

import { Colors } from "@/constants/Colors";

type Exercise = {
  name: string;
};

const testData: Exercise[] = [
  { name: "Military Press" },
  { name: "Barbell Bench Press" },
  { name: "Overhead Press" },
];

export default function Index() {
  return (
    <DefaultPage title="Your Exercises" back>
      <Searchbar placeholder="Search for Exercise" />
      <View style={styles.exerciseContainer}>
        {/* TODO: sort these alphabetically */}
        <FlatList
          data={testData}
          renderItem={({ item }) => <ExerciseBase label={item.name} />}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        />
      </View>
      <LinkButton href="/exercises/addExercise" theme="primary" label="Add Exercise" icon={"plus"} />
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

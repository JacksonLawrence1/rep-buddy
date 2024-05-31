import { FlatList, StyleSheet, View } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import Searchbar from "@/components/inputs/Searchbar";
import WorkoutItem from "@/components/listItems/WorkoutItem";
import LinkButton from "@/components/Buttons/LinkButton";

import { Colors } from "@/constants/Colors";

const testData = [
  {
    id: "1",
    name: "Chest Day",
  },
  {
    id: "2",
    name: "Leg Day",
  },
  {
    id: "3",
    name: "Arm Day",
  },
  {
    id: "4",
    name: "tesatasdfads asdasdasdas dasdasdaa ",
  }
];

export default function Index() {
  return (
    <DefaultPage title="Your Workouts" back>
      <Searchbar placeholder="Search for workout" />
      <View style={style.workoutsContainer}>
        {/* TODO: sort by most recently used */}
        <FlatList
          data={testData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutItem workoutName={item.name} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        /> 
      </View>
      <LinkButton href="/workouts/workoutTemplate" theme="primary" label="Create Workout" icon={"plus"} />
    </DefaultPage>
  );
}

const style = StyleSheet.create({
  workoutsContainer: {
    flex: 1,
    padding: 8,
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.backgroundDark,
  },
});

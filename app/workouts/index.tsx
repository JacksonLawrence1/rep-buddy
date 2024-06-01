import { FlatList, View } from "react-native";

import DefaultPage from "@/components/DefaultPage";
import Searchbar from "@/components/inputs/Searchbar";
import WorkoutItem from "@/components/listItems/WorkoutItem";
import LinkButton from "@/components/Buttons/LinkButton";

import { globalStyles } from "@/constants/styles";

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
  },
];

export default function Index() {
  return (
    <DefaultPage title="Your Workouts" back>
      <Searchbar placeholder="Search for workout" />
      <View style={globalStyles.scrollContainer}>
        {/* TODO: sort by most recently used */}
        <FlatList
          data={testData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutItem workoutName={item.name} />}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      </View>
      <LinkButton
        href="/workouts/workoutTemplate"
        theme="primary"
        label="Create Workout"
        icon={"plus"}
      />
    </DefaultPage>
  );
}

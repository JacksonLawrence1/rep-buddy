import { FlatList, View } from "react-native";

import { useEffect, useState } from "react";

import LinkButton from "@/components/Buttons/LinkButton";
import DefaultPage from "@/components/DefaultPage";
import Searchbar from "@/components/inputs/Searchbar";
import ExerciseItem from "@/components/listItems/ExerciseItem";

import { globalStyles } from "@/constants/styles";

import exerciseService from "@/constants/storage/exercises";

export default function Index() {
  const [exercises, setExercises] = useState(exerciseService.exercises);

  const service: string = "exercisesPage";

  useEffect(() => {
    exerciseService.subscribe(service, setExercises);
    return () => exerciseService.unsubscribe(service);
  }, []);

  return (
    <DefaultPage title="Your Exercises" back>
      <Searchbar placeholder="Search for Exercise" />
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseItem exerciseName={item.name} />}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        />
      </View>
      <LinkButton href="/exercises/addExercise" theme="primary" label="Add Exercise" icon={"plus"} />
    </DefaultPage>
  );
}

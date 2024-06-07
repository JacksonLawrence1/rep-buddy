import { FlatList, View } from "react-native";

import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutLogExercise from "./WorkoutLogExercise";

import { globalStyles } from "@/constants/styles";

import { useLogService } from "@/hooks/services/useLogService";
import WorkoutLogBuilder from "@/services/builders/WorkoutLogBuilder";

type WorkoutLogProps = {
  log: WorkoutLogBuilder;
};

export default function WorkoutLog({ log }: WorkoutLogProps) {
  // this reactively updates our workout sets
  const exerciseSets = useLogService(log);

  return (
    <DefaultPage title={log.name}>
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={exerciseSets}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <WorkoutLogExercise key={index} index={index} exerciseSet={item} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          // Add another exercise button
        />
      </View>
      {/* Timer at bottom */}
    </DefaultPage>
  );
}

import ListItem from "./ListItem";

import { Colors } from "@/constants/Colors";
import { Icon } from "@/constants/Icon";

interface ExerciseBaseProps {
  exerciseName: string;
}

export default function ExerciseBase({ exerciseName }: ExerciseBaseProps) {
  // TODO: add icon onPress functions
  const icons: Icon[] = [
    { name: "ellipsis-h" },
  ]

  return <ListItem label={exerciseName} backgroundColor={Colors.tertiary} icons={icons} />;
}


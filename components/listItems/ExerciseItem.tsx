import { FontAwesome5 }from "@expo/vector-icons";

import ListItem from "./ListItem";

import { colors } from "@/constants/colors";
import { icon } from "@/constants/icon";

interface ExerciseBaseProps {
  exerciseName: string;
  onPress?: () => void;
  size?: number;
  icons?: (keyof typeof FontAwesome5.glyphMap)[];
}

export default function ExerciseBase({ exerciseName, size, icons = ["ellipsis-h"], onPress }: ExerciseBaseProps) {
  // TODO: add icon onPress functions
  const itemIcons: icon[] = icons.map((icon) => ({ name: icon }) as icon);

  return <ListItem onPress={onPress} size={size} label={exerciseName} backgroundColor={colors.tertiary} icons={itemIcons} />;
}


import { Exercise } from "@/constants/types";
import ListItem from "./ListItem";
import { colors } from "@/constants/colors";

interface ExerciseBaseProps extends Exercise {
  onPress?: () => void;
}

export default function ExerciseBase({ name, onPress }: ExerciseBaseProps) {
  const icon: string = "ellipsis-h";

  return <ListItem label={name} onPress={onPress} backgroundColor={colors.tertiary} icon={icon} />;
}


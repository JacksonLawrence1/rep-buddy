import { Exercise } from "@/constants/types";
import ListItem from "./ListItem";
import { colors } from "@/constants/colors";

import { ExercisePopoutMenu } from "@/components/listItems/ExercisePopoutMenus";

interface ExerciseBaseProps extends Exercise {
  onPress?: () => void;
}

export default function ExerciseBase({ name, id, onPress }: ExerciseBaseProps) {
  return (
    <ListItem
      label={name}
      PopoutMenu={<ExercisePopoutMenu id={id} />}
      onPress={onPress}
      backgroundColor={colors.tertiary}
    />
  );
}

import ListItem from "@/components/primitives/ListItem";
import { Edit, Delete }from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { Exercise } from "@/constants/types";

interface ExerciseItemProps {
  exercise: Exercise;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ExerciseItem({ exercise, onPress, onEdit, onDelete }: ExerciseItemProps) {
  // options on the popout menu 
  const popoutMenuOptions: React.ReactNode[] = [];

  // add menu options
  if (onDelete) {
    popoutMenuOptions.push(<Delete key={0} onPress={onDelete} />);
  }

  if (onEdit) {
    popoutMenuOptions.push(<Edit key={1} onPress={onEdit} />);
  }

  return (
    <ListItem
      label={exercise.name}
      onPress={onPress}
      popoutMenuOptions={{ icon: "ellipsis-h", options: popoutMenuOptions }}
      backgroundColor={colors.tertiary}
    />
  );
}

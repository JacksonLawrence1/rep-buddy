import ListItem from "@/components/primitives/ListItem";
import { Edit, Delete } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { WorkoutCompressed } from "@/constants/types";

interface WorkoutItemProps {
  workout: WorkoutCompressed;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function WorkoutItem({ workout, onPress, onEdit, onDelete }: WorkoutItemProps) {
  // options on the popout menu 
  const popoutMenuOptions: React.ReactNode[] = [];

  // add popout menu options
  if (onDelete) {
    popoutMenuOptions.push(<Delete key={0} onPress={onDelete} />);
  }

  if (onEdit) {
    popoutMenuOptions.push(<Edit key={1} onPress={onEdit} />);
  }

  return (
    <ListItem
      label={workout.name}
      onPress={onPress}
      backgroundColor={colors.primary}
      popoutMenuOptions={{ icon: "ellipsis-h", options: popoutMenuOptions }}
    />
  );
}

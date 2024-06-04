import ListItem from "./ListItem";
import { DeleteOption } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { Workout } from "@/constants/types";

import workoutService from "@/constants/storage/workouts";

interface WorkoutBaseProps {
  item: Workout;
  onPress?: () => void;
}

export default function WorkoutBase({ item, onPress }: WorkoutBaseProps) {
  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [
    <DeleteOption<Workout> key={1} id={item.id} service={workoutService} />,
  ];

  return (
    <ListItem
      label={item.name}
      onPress={onPress}
      backgroundColor={colors.primary}
      popoutMenuOptions={{ icon: "ellipsis-h", options: popoutMenuOptions }}
    />
  );
}

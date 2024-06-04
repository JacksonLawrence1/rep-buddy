import ListItem from "./ListItem";
import { DeleteOption, EditOption }from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { Exercise } from "@/constants/types";

import exerciseService from "@/constants/storage/exercises";

interface ExerciseBaseProps{
  item: Exercise;
  onPress?: () => void;
}

export default function ExerciseItem({ item, onPress }: ExerciseBaseProps) {
  // options on the popout menu 
  const popoutMenuOptions: React.ReactNode[] = [
    <DeleteOption<Exercise> key={0} id={item.id} service={exerciseService} />,
    <EditOption key={1} id={item.id} path="/exercises/[id]" />,
  ];

  return (
    <ListItem
      label={item.name}
      onPress={onPress}
      popoutMenuOptions={{ icon: "ellipsis-h", options: popoutMenuOptions }}
      backgroundColor={colors.tertiary}
    />
  );
}

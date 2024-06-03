import { MenuOption } from "react-native-popup-menu";
import PopoutMenu, { DeleteOption } from "@/components/primitives/PopoutMenu";

import { Text, StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

import { FontAwesome5 } from "@expo/vector-icons";

import exerciseService from "@/constants/storage/exercises";
import { Exercise } from "@/constants/types";

interface ExercisePopoverProps {
  id: string;
}

const EditOption = (): React.ReactNode => {
  return (
    <MenuOption onSelect={() => alert("pressed edit")}>
      <Text style={styles.text}>Edit</Text>
      <FontAwesome5 name="edit" size={16} color={colors.text} />
    </MenuOption>
  );
}

export function ExercisePopoutMenu({ id }: ExercisePopoverProps): React.ReactNode {
  const options: React.ReactNode[] = [
    <EditOption key={0} />, 
    <DeleteOption<Exercise> key={1} id={id} service={exerciseService} />
  ];

  return <PopoutMenu options={options} />;
}

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
  },
});

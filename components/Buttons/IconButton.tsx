import { Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

type IconButtonProps = {
  disabled?: boolean;
  icon?: keyof typeof FontAwesome5.glyphMap | undefined;
  onPress?: () => void;
};

export default function IconButton({ disabled = false, icon, onPress = () => undefined }: IconButtonProps) {
  // why have disabled as a prop?
  // for flex boxes, need to ensure that the hidden button takes up the same space as another potentially visible button
  return (
    <Pressable onPress={onPress} style={[styles.buttonContainer, disabled && {opacity: 0}]}>
      <FontAwesome5 name={icon} size={24} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 100,
  },
});

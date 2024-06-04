import { View, Pressable, StyleSheet } from "react-native";
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
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon} size={20} color={colors.text} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: colors.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
  },
});

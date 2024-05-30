import { View, Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type BackButtonProps = {
  type?: "visible" | "hidden";
};

export default function BackButton({ type = "visible" }: BackButtonProps) {
  if (type === "hidden") {
    return (
      <Pressable style={[styles.buttonContainer, {backgroundColor: 'transparent'}]}>
        <FontAwesome5 name="arrow-left" size={16} color={"transparent"} />
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.buttonContainer}>
      <FontAwesome5 name="arrow-left" size={16} color={Colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

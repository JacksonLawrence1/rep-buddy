import { Pressable, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

interface ExerciseBaseProps {
  label: string;
}

export default function ExerciseBase({ label }: ExerciseBaseProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>

        <Pressable style={styles.iconContainer}>
          <FontAwesome5 name="ellipsis-h" size={24} color={Colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.tertiary,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  iconContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 9,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: "Rubik-Regular",
  },
});

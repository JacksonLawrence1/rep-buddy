import { Pressable, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

import { Icon } from "@/constants/Icon";

interface ExerciseBaseProps {
  label: string;
  backgroundColor: (typeof Colors)[keyof typeof Colors]; // only allow colors from Colors
  icons?: Icon[]; // ordered from left to right
}

export default function ExerciseBase({ label, backgroundColor, icons }: ExerciseBaseProps) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>

        <View style={styles.iconsContainer}>
          {icons && icons.map((icon, index) => ( // map over the icons array
            <Pressable key={index} onPress={icon.onPress} style={styles.iconContainer}>
              <FontAwesome5 name={icon.name} size={24} color={Colors.text} />
            </Pressable>
          ))}
        </View>
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
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 4,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
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

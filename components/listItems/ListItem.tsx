import { Pressable, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

import { icon } from "@/constants/icon";

interface ExerciseBaseProps {
  label: string;
  backgroundColor: (typeof colors)[keyof typeof colors]; // only allow colors from colors
  icons?: icon[]; // ordered from left to right
  size?: number;
  onPress?: () => void;
}

export default function ListItem({ label, backgroundColor, size = 24, icons, onPress }: ExerciseBaseProps) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>

        <View style={styles.iconsContainer}>
          {icons && icons.map((icon, index) => ( // map over the icons array
            <Pressable key={index} onPress={icon.onPress} style={styles.iconContainer}>
              <FontAwesome5 name={icon.name} size={size} color={colors.text} />
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    minHeight: 48,
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
    flex: 1,
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
    color: colors.text,
    fontFamily: "Rubik-Regular",
  },
});

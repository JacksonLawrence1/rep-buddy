import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { PopoutMenu, PopoutMenuOptions } from "@/components/primitives/PopoutMenus";

interface ExerciseBaseProps {
  label: string;
  backgroundColor: (typeof colors)[keyof typeof colors]; // only allow colors from colors
  height?: number;
  onPress?: () => void;
  popoutMenuOptions?: PopoutMenuOptions;
}

export default function ListItem({ label, backgroundColor, height = 52, onPress, popoutMenuOptions }: ExerciseBaseProps) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor, height: height }]}>
      <Pressable style={styles.buttonContainer} disabled={onPress === undefined} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>

        <View style={styles.iconsContainer}>
          {popoutMenuOptions && <PopoutMenu {...popoutMenuOptions} />}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    width: "100%",
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

import { StyleSheet, View, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

enum Theme {
  Primary,
}

type ButtonProps = {
  label: string;
  theme?: Theme;
  icon?: keyof typeof FontAwesome5.glyphMap;
  size?: number;
  onPress?: () => void;
};

export default function Button({
  label,
  theme,
  icon,
  size,
  onPress = () => undefined,
}: ButtonProps) {
  const isPrimary: boolean = theme === Theme.Primary;

  return (
    <View
      style={styles.buttonContainer}
    >
      <Pressable
        style={[styles.button, isPrimary && styles.primaryButton]}
        onPress={onPress}
      >
        <Text style={styles.text}>{label}</Text>
        {icon && (
          <FontAwesome5 name={icon} size={size || 24} style={styles.buttonIcon} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 64,
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: Colors.border,
  },
  button: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.border,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    borderWidth: 0,
  },
  buttonIcon: {
    paddingHorizontal: 16,
    paddingTop: 2,
    color: Colors.text,
  },
  text: {
    color: Colors.text,
    fontSize: 24,
    paddingHorizontal: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
});

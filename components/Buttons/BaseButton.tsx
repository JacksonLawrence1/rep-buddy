import React from "react";

import { View, StyleSheet, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { Theme, ThemeEnum } from "@/constants/enums/theme";

export interface ButtonProps {
  label: string;
  theme?: Theme;
  icon?: keyof typeof FontAwesome5.glyphMap;
  size?: number;
  height?: number;
  onPress?: () => void;
}

const BaseButton = React.forwardRef<View, ButtonProps>(
  ({ label, height, theme, icon, size, onPress = () => undefined }, ref) => {
    const isPrimary: boolean = theme === ThemeEnum.Primary;

    return (
      <Pressable
        style={[styles.button, {height: height || 48}, isPrimary && styles.primaryButton, icon === undefined && {justifyContent: "center"}]}
        onPress={onPress}
        ref={ref}
      >
        <Text style={styles.text}>{label}</Text>
        {icon && (
          <FontAwesome5
            name={icon}
            size={size || 24}
            style={styles.buttonIcon}
          />
        )}
      </Pressable>
    );
  },
);

BaseButton.displayName = "BaseButton";
export default BaseButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.border,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  buttonIcon: {
    paddingHorizontal: 16,
    paddingTop: 2,
    color: Colors.text,
  },
  text: {
    color: Colors.text,
    fontSize: 20,
    paddingHorizontal: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
});

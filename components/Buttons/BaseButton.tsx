import React from "react";

import { View, StyleSheet, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
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
        style={[buttonStyles.button, {height: height || 48}, isPrimary && buttonStyles.primaryButton, icon === undefined && {justifyContent: "center"}]}
        onPress={onPress}
        ref={ref}
      >
        <Text style={buttonStyles.text}>{label}</Text>
        {icon && (
          <FontAwesome5
            name={icon}
            size={size || 24}
            style={buttonStyles.buttonIcon}
          />
        )}
      </Pressable>
    );
  },
);

BaseButton.displayName = "BaseButton";
export default BaseButton;

export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  buttonIcon: {
    paddingHorizontal: 16,
    paddingTop: 2,
    color: colors.text,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    paddingHorizontal: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
});

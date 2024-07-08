import React from "react";
import { View, StyleSheet, Pressable, Text, StyleProp, ViewStyle } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { Theme, ThemeEnum } from "@/constants/enums/theme";

export interface ButtonProps {
  label: string;
  theme?: Theme;
  disabled?: boolean;
  icon?: keyof typeof FontAwesome5.glyphMap;
  size?: number;
  height?: number;
  onPress?: () => void;
}

function themeHelper(isPrimary: boolean, isDisabled: boolean, height: number | undefined) {
  const styles: StyleProp<ViewStyle>[] = [buttonStyles.button, { height: height || 48 }];

  // this is not great to look at 
  if (isPrimary) {
    styles.push(buttonStyles.primaryButton);
    if (isDisabled) {
      styles.push({ backgroundColor: colors.primaryAccent });
    }
  } else if (isDisabled) {
    styles.push({ backgroundColor: colors.disabled });
  }

  return styles;
}

const BaseButton = React.forwardRef<View, ButtonProps>(
  ({ label, height, theme, icon, size, disabled = false, onPress = () => undefined }, ref) => {
    const isPrimary: boolean = theme === ThemeEnum.Primary;
    const hasIcon: boolean = icon !== undefined;

    // ensure that the onPress function is only called when the button is not disabled
    function handlePress() {
      if (!disabled) {
        onPress();
      }
    }

    return (
      <Pressable
        style={themeHelper(isPrimary, disabled, height)}
        onPress={handlePress}
        ref={ref}
      >
        <Text style={[buttonStyles.text, !hasIcon && { textAlign: 'center' }]}>{label}</Text>
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
    flex: 1,
    color: colors.text,
    fontSize: 20,
    paddingHorizontal: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
});

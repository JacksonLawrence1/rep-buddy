import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ButtonProps } from "./BaseButton";

import ButtonBase from "./BaseButton";

export default function Button({ ...buttonProps }: ButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <ButtonBase {...buttonProps} />
    </View>
  );
}

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    width: "100%",
  },
});

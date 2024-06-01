import { View, StyleSheet } from "react-native";

import InputBase from "./InputBase";
import { InputBaseProps } from "./InputBase";

import { colors } from "@/constants/colors";

export default function NumericInput({ ...inputProps }: InputBaseProps) {
  return (
    <View style={styles.numericInputContainer}>
      <InputBase {...inputProps} inputMode="numeric" />
    </View>
  );
}

const styles = StyleSheet.create({
  numericInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 48,
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
  },
});

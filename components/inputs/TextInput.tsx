import { View, StyleSheet } from "react-native";

import InputBase from "./InputBase";
import { InputBaseProps } from "./InputBase";

import { Colors } from "@/constants/Colors";

export default function TextInput({ ...inputProps }: InputBaseProps) {
  return (
    <View style={styles.textInputContainer}>
      <InputBase {...inputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 48,
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
  },
});

import { View, StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";

type InputFieldProps = {
  title: string;
  children: React.ReactNode;
};

export default function InputField({ title, children }: InputFieldProps) {
  return (
    <View style={styles.inputFieldContainer}>
      <Text style={styles.inputTitle}>{`${title}:`}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldContainer: {
    paddingVertical: 16,
  },
  inputTitle: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
    marginBottom: 12,
  },
});

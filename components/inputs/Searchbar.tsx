import { View, StyleSheet } from "react-native";
import { FontAwesome5  } from "@expo/vector-icons";

import InputBase from "./InputBase";
import { InputBaseProps } from "./InputBase";

import { colors } from "@/constants/colors";

export default function Searchbar({ ...inputProps }: InputBaseProps) {
  return (
    <View style={styles.searchbarContainer}>
      <FontAwesome5 name="search" size={16} color={colors.textDark} />
      <InputBase {...inputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
  },
});

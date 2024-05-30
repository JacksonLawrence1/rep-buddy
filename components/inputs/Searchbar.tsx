import { View, StyleSheet } from "react-native";
import { FontAwesome5  } from "@expo/vector-icons";

import InputBase from "./InputBase";
import { InputBaseProps } from "./InputBase";

import { Colors } from "@/constants/Colors";

export default function Searchbar({ placeholder }: InputBaseProps) {
  return (
    <View style={styles.searchbarContainer}>
      <FontAwesome5 name="search" size={16} color={Colors.textDark} />
      <InputBase placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 48,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
  },
});

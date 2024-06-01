import { StyleSheet, Text, Pressable, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useState } from "react";

import { colors } from "@/constants/colors";
import OptionList from "./OptionList";

interface OptionProps {
  selected: string;
  select: (string: string) => void;
  options: string[];
}

export default function Option({ selected, select, options }: OptionProps) {
  const [open, setOpen] = useState(false);
  
  const changeSelected = (value: string) => {
    select(value);
    setOpen(false);
  }

  return (
    <Pressable onPress={() => setOpen(!open)} style={styles.optionContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.optionText}>{selected || 'Options'}</Text>
        
        <FontAwesome5 name={open ? "chevron-up" : "chevron-down"} size={16} color={colors.text} />
      </View>
      {open && <OptionList selected={selected} options={options} setSelected={changeSelected} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    height: 48,
    width: "100%",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    height: 48,
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    zIndex: 5,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    textTransform: "capitalize",
  },
});

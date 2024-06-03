import { Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

import React, { useState } from "react";

type TagProps<T> = {
  label: string;
  enumValue?: T;
  setToAddTo?: Set<T>; 
};

export default function Tag<T>({ label, enumValue, setToAddTo }: TagProps<T>) {
  const [enabled, setEnabled] = useState(false);

  const onPress = () => {
    // we need to cache the state because the state is async
    const state: boolean = !enabled;
    setEnabled(state);

    // optionally add/remove tag to a set
    if (setToAddTo && enumValue) {
      if (state) {
        setToAddTo.delete(enumValue);
      } else {
        setToAddTo.add(enumValue);
      }
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tagContainer,
        { backgroundColor: enabled ? colors.success : colors.primary },
      ]}
    >
      <Text style={styles.tagText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  tagText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    textTransform: "capitalize",
  },
});

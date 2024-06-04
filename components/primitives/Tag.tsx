import { Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

import React, { useState } from "react";

type TagProps = {
  label: string;
  callback: (state: boolean) => void;
  enabledOnStart?: boolean;
};

export default function Tag({label, callback, enabledOnStart = false}: TagProps) {
  const [enabled, setEnabled] = useState(enabledOnStart);

  function toggleState() {
    const state = !enabled;

    setEnabled(state);
    callback(state);
  }

  return (
    <Pressable
      onPress={toggleState}
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

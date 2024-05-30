import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

import React, { useState } from "react";

type TagProps = {
  label: string;
};

export default function Tag({ label }: TagProps) {
  const [enabled, setEnabled] = useState(false);
  // TODO: Forward the enabled state to the parent component
  return (
    <Pressable
      onPress={() => setEnabled(!enabled)}
      style={[
        styles.muscleGroup,
        { backgroundColor: enabled ? Colors.success : Colors.primary },
      ]}
    >
      <Text style={styles.muscleGroupText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  muscleGroup: {
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  muscleGroupText: {
    color: Colors.text,
    fontFamily: "Rubik-Regular",
  },
});

import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

interface ButtonClickerProps {
  icon?: keyof typeof FontAwesome5.glyphMap | undefined;
  disabled: boolean;
  onPress: () => void;
}

interface NumberPickerProps {
  value: number;
  onChange?: (value: number) => void;
}

function ButtonClicker({ icon, onPress, disabled }: ButtonClickerProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.clicker,
        { backgroundColor: disabled ? "gray" : colors.backgroundDark },
      ]}
    >
      <FontAwesome5
        name={icon}
        size={16}
        color={disabled ? "lightgray" : colors.text}
      />
    </Pressable>
  );
}

// might do an A/B test to see which one is more intuitive

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NumberPicker1({ value, onChange }: NumberPickerProps) {
  return (
    <View style={styles.container}>
      <View style={alternatives.text}>
        <Text style={styles.textContainer}>Sets:</Text>
      </View>
      <View style={alternatives.inputContainer}>
        {onChange && (
          <ButtonClicker
            icon="minus"
            disabled={value === 0}
            onPress={() => onChange(value - 1)}
          />
        )}
        <Text style={styles.textContainer}>{value}</Text>
        {onChange && (
          <ButtonClicker
            icon="plus"
            disabled={value === 20}
            onPress={() => onChange(value + 1)}
          />
        )}
      </View>
    </View>
  );
}

function NumberPicker2({ value, onChange }: NumberPickerProps) {
  return (
    <View style={styles.container}>
      {onChange && (
        <ButtonClicker
          icon="minus"
          disabled={value === 0}
          onPress={() => onChange(value - 1)}
        />
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.textContainer}>Sets:</Text>
        <Text style={styles.textContainer}>{value}</Text>
      </View>
      {onChange && (
        <ButtonClicker
          icon="plus"
          disabled={value === 20}
          onPress={() => onChange(value + 1)}
        />
      )}
    </View>
  );
}

export default function NumberPicker({ value, onChange }: NumberPickerProps) {
  const [startValue, setStartValue] = useState(value);

  function handleChange(newValue: number) {
    if (!onChange) return;

    newValue = Math.max(0, Math.min(20, newValue)); // clamp between 0 and 99

    setStartValue(newValue);
    onChange(newValue);
  }

  return (
    <NumberPicker2
      value={startValue}
      onChange={onChange ? handleChange : undefined}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 48,
    minHeight: 48,
    paddingHorizontal: 8,
  },
  textContainer: {
    fontSize: 16,
    color: colors.text,
    fontFamily: "Rubik-Regular",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    gap: 8,
    paddingVertical: 4,
    color: colors.text,
    maxHeight: 48,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  clicker: {
    minWidth: 32,
    minHeight: 32,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const alternatives = StyleSheet.create({
  text: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderRadius: 8,
    width: 120,
    padding: 4,
  },
});

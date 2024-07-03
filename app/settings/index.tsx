import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import InputField from "@/components/inputs/InputField";
import DefaultPage from "@/components/pages/DefaultPage";

import { colors } from "@/constants/colors";
import settings from "@/constants/settings";
import { weightUnit } from "@/constants/types";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import Button from "@/components/buttons/Button";
import { router } from "expo-router";

export default function Settings() {
  // NOTE: we'll move these to separate components once we have a need for more settings
  // once we have more settings, also consider adding an alert when the user tries to leave the page without saving
  const [weightUnit, setWeightUnit] = useState<weightUnit>(settings.weightUnit);

  function changeWeightUnit(unit: weightUnit) {
    setWeightUnit(unit);
  }

  function saveSettings() {
    settings.weightUnit = weightUnit;
    router.back();
  }

  return (
    <DefaultPage title="settings">
      <ScrollView style={styles.settingsContainer}>
        <InputField title="Weight Unit">
          <View style={styles.optionContainer}>
            <Pressable style={styles.settingsOption} onPress={() => changeWeightUnit("kg")}>
              <Text style={styles.settingsOptionText}>kg</Text>
              {weightUnit === "kg" && (
                <FontAwesome5 name={"check"} size={16} color={colors.text} />
              )}
            </Pressable>
            <Pressable style={[styles.settingsOption, { borderBottomWidth: 0 }]} onPress={() => changeWeightUnit("lbs")}>
              <Text style={styles.settingsOptionText}>lbs</Text>
              {weightUnit === "lbs" && (
                <FontAwesome5 name={"check"} size={16} color={colors.text} />
              )}
            </Pressable>
          </View>
        </InputField>
      </ScrollView>
      <Button label="Save" theme="primary" onPress={saveSettings} />
    </DefaultPage>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  optionContainer: {
    backgroundColor: colors.backgroundDark,
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  settingsOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
    width: "100%",
  },
  settingsOptionText: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: colors.text,
  },
});

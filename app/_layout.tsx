import { Stack } from "expo-router/stack";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { colors } from "@/constants/colors";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("@/assets/fonts/Rubik-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.pageContainer}>
        <Text>Failed to Load, please reload the app.</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <StatusBar style="light" />
      <Stack screenOptions={{headerShown: false}}>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 2,
    paddingVertical: 48,
  },
});

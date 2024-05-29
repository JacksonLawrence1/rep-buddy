import { Stack } from "expo-router/stack";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { Colors } from "@/constants/Colors";

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
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    borderWidth: 2,
    paddingVertical: 48,
  },
});

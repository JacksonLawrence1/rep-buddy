import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { colors } from "@/constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";

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
    <GestureHandlerRootView>
      <MenuProvider>
        <TouchableWithoutFeedback
          accessible={false}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.pageContainer}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}></Stack>
          </View>
        </TouchableWithoutFeedback>
      </MenuProvider>
    </GestureHandlerRootView>
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

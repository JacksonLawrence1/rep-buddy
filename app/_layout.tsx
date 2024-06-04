import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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

  function backgroundPressHandler() {
    // on web, ignore as it won't let us type otherwise
    if (Platform.OS === "web") {
      return;
    }

    Keyboard.dismiss();
  }

  return (
    <GestureHandlerRootView>
      <MenuProvider>
        <TouchableWithoutFeedback
          accessible={false}
          onPress={backgroundPressHandler}
        >
          <View style={styles.pageContainer}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="exercises/[id]" options={{ presentation: "modal" }} />
            </Stack>
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

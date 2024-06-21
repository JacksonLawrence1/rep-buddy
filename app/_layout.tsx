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

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import store from "./store";

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

  function backgroundPressHandler() {
    // on web, ignore as it won't let us type otherwise
    if (Platform.OS === "web") {
      return;
    }

    Keyboard.dismiss();
  }

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <TouchableWithoutFeedback
          accessible={false}
          onPress={backgroundPressHandler}
        >
          <MenuProvider style={styles.pageContainer}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />

              <Stack.Screen name="workouts/index" />
              <Stack.Screen name="workouts/new/index" />
              <Stack.Screen name="workouts/edit/[id]" />

              <Stack.Screen 
                name="workouts/history/[id]"
                options={{ presentation: "modal" }}
              />

              <Stack.Screen
                name="exercises/picker"
                options={{ presentation: "modal" }}
              />

              <Stack.Screen name="exercises/index" />

              <Stack.Screen
                name="exercises/new/index"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="exercises/edit/[id]"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="exercises/history/[id]"
                options={{ presentation: "modal" }}
              />
            </Stack>
          </MenuProvider>
        </TouchableWithoutFeedback>
      </Provider>
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

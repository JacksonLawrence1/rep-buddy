import { View, StyleSheet, Text } from "react-native";

import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleBottom}>Your Workouts</Text>
      </View>
      <View style={styles.mainContainer}>
        <Button label="Exercises" icon={"dumbbell"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  titleTop: {
    fontSize: 64,
    color: Colors.text,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  titleBottom: {
    fontSize: 24,
    color: Colors.text,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  mainContainer: {
    flex: 2,
    gap: 16,
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

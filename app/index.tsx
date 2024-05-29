import { View, StyleSheet, Text } from "react-native";

import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router/build/exports";

export default function Index() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTop}>EZ</Text>
        <Text style={styles.titleBottom}>Workout Planner</Text>
      </View>
      <View style={styles.mainContainer}>
        <Button label="Start Workout" theme={0} />
        <Link href="/workouts">
          <Button label="Workouts" icon={"plus"} />
        </Link>
        <Button label="Exercises" icon={"dumbbell"} />
        <Button label="History" icon={"history"} />
      </View>
      <View style={styles.footerContainer}>
          <Text style={{ flex: 1, flexShrink: 0, width: '100%', color: Colors.textDark }}>Version: 1.0.0</Text>
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

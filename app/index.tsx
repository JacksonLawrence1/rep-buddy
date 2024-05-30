import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";

import Button from "@/components/Buttons/Button";
import LinkButton from "@/components/Buttons/LinkButton";
import PageContainer from "@/components/PageContainer";

export default function Index() {
  return (
    <PageContainer>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTop}>EZ</Text>
        <Text style={styles.titleBottom}>Workout Planner</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button label="Start Workout" theme="primary" />
        <LinkButton href='/workouts' label="Workouts" icon={"plus"} />
        <LinkButton href='/exercises' label="Exercises" icon={"dumbbell"} />
        <LinkButton href='/history' label="History" icon={"history"} />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Version: 1.0.0</Text>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 64,
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
  buttonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    color: Colors.textDark,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
});

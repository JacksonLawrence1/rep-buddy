import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

import LinkButton from "@/components/buttons/LinkButton";
import PageContainer from "@/components/pages/PageContainer";

export default function Index() {
  return (
    <PageContainer>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTop}>EZ</Text>
        <Text style={styles.titleBottom}>Workout Planner</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <LinkButton height={64} href='/log' label="Start Workout" theme="primary" />
        <LinkButton height={64} href='/workouts' label="Workouts" icon={"plus"} />
        <LinkButton height={64} href='/exercises' label="Exercises" icon={"dumbbell"} />
        <LinkButton height={64} href='/history' label="History" icon={"history"} />
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
    color: colors.text,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  titleBottom: {
    fontSize: 24,
    color: colors.text,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  buttonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 32,
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    color: colors.textDark,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
});

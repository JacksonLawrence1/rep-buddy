import { colors } from "@/constants/colors";
import { View, Text, StyleSheet } from "react-native";

export default function Timer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>01:13:54</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: -12,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerContainer: {
    width: '100%',
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tertiary,
    paddingVertical: 16,
  },
  timerText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 38,
  },
});

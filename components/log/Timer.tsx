import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { colors } from "@/constants/colors";
import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

export default function Timer() {
  const log: LogBuilder | null = useContext(LogContext);
  const [timer, setTimer] = useState<string>("00:00:00");

  useEffect(() => {
    if (!log) return;

    const interval = setInterval(() => {
      setTimer(log.duration);
    }, 500); // sometimes skips a second with 1000ms, so we update every 500ms

    return () => {
      clearInterval(interval);
    };
  });

  if (!log) return null;

  return (
    <View style={styles.footerContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer}</Text>
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
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.tertiary,
  },
  timerContainer: {
    width: '100%',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  timerText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 38,
  },
});

import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";

function formatDuration(duration: number): string {
  // format to hh:mm:ss, as a string
  const time: [number, number, number] = [
    Math.floor(duration / 3600000),
    Math.floor((duration % 3600000) / 60000),
    Math.floor((duration % 60000) / 1000),
  ];

  return time.map((t) => (t < 10 ? `0${t}` : t)).join(":");
}

function getDuration(date: Date): number {
  return Date.now() - date.getTime();
}

interface TimerProps {
  date: Date;
}

export default function Timer({ date }: TimerProps) {
  const [timer, setTimer] = useState(getDuration(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getDuration(date));
    }, 500); // sometimes skips a second with 1000ms, so we update every 500ms

    return () => {
      clearInterval(interval);
    };
  });

  return <Text style={styles.timerText}>{formatDuration(timer)}</Text>;
}

const styles = StyleSheet.create({
  timerText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 38,
  },
});

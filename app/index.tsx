import { colors } from "@/constants/colors";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { alertDetails, hideAlert } from "@/features/alerts";
import { RootState } from "./store";

import Button from "@/components/buttons/Button";
import LinkButton from "@/components/buttons/LinkButton";
import ResumePopup from "@/components/log/ResumePopup";
import PageContainer from "@/components/pages/PageContainer";
import Alert from "@/components/primitives/Alert";
import IconButton from "@/components/buttons/IconButton";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Index() {
  const alert = useSelector((state: RootState) => alertDetails(state.alerts));
  const dispatch = useDispatch();

  function handleAlert(visible: boolean) {
    if (!visible) {
      dispatch(hideAlert());
    }
  }

  return (
    <PageContainer>
      <View style={styles.settingsContainer}>
        <IconButton icon="cog" onPress={() => router.navigate("/settings")} />
      </View>
      <Alert
        visible={alert.visible}
        title={alert?.title}
        description={alert?.description}
        cancelText="Close"
        setVisible={handleAlert}
      />
      <View style={styles.homeContainer}>
        <FontAwesome5 name="dumbbell" size={128} color={colors.textDark} />
        <View style={styles.buttonsContainer}>
          <LinkButton
            height={64}
            href="/workouts"
            label="Workouts"
            icon={"plus"}
          />
          <LinkButton
            height={64}
            href="/exercises"
            label="Exercises"
            icon={"dumbbell"}
          />
          <LinkButton
            height={64}
            href="/history"
            label="History"
            icon={"history"}
          />
          <Button
            height={64}
            onPress={() => router.navigate("/log")}
            label="Start Workout"
            theme="primary"
          />
        </View>
        <Text style={styles.footerText}>Version: 1.0.0</Text>
      </View>
      <ResumePopup />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
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
  settingsContainer: {
    position: "absolute",
    paddingTop: 8,
    right: 16,
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 64,
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    justifyContent: "space-between",
    gap: 16,
  },
  footerText: {
    color: colors.textDark,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
});

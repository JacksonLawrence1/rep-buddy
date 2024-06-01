import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const globalStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    borderRadius: 8,
    padding: 8,
    width: "100%",
    alignSelf: 'stretch', 
  },
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
  },
  title: {
    fontSize: 20,
    color: colors.text,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
});

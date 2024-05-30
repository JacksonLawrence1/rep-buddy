import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

import BackButton from "@/components/Buttons/BackButton";

import PageContainer from "@/components/PageContainer";

type DefaultPageProps = {
  title: string;
  back?: boolean; // If we want to show a back button
  children: React.ReactNode;
};

export default function DefaultPage({
  title,
  back = false,
  children,
}: DefaultPageProps) {
  return (
    <PageContainer>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <BackButton type={back ? 'visible' : 'hidden'} />
          <Text style={styles.title}>{title}</Text>
          <BackButton type={'hidden'} />
        </View>
        {children}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    width: "100%",
  },
  titleTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  title: {
    fontSize: 20,
    color: Colors.text,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
});

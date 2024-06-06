import { Text, View } from "react-native";

import IconButton from "@/components/buttons/IconButton";
import PageContainer from "@/components/pages/PageContainer";

import { globalStyles } from "@/constants/styles";
import { router } from "expo-router";

type DefaultPageProps = {
  title: string;
  theme?: "default" | "modal";
  children: React.ReactNode;
};

function TitleBackStyle(title: string): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"arrow-left"} onPress={() => router.back()} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"arrow-left"} />
    </View>
  );
}

function TitleModalStyle(title: string): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"times"} onPress={() => router.back()} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"times"} />
    </View>
  );
}

export default function DefaultPage({
  title,
  theme,
  children,
}: DefaultPageProps) {
  return (
    <PageContainer>
      <View style={globalStyles.contentContainer}>
        {theme === "modal"
          ? TitleModalStyle(title)
          : TitleBackStyle(title)}
        {children}
      </View>
    </PageContainer>
  );
}

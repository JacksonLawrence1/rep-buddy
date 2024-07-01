import { Text, View } from "react-native";

import IconButton from "@/components/buttons/IconButton";
import PageContainer from "@/components/pages/PageContainer";

import { globalStyles } from "@/constants/styles";
import { router } from "expo-router";

type DefaultPageProps = {
  title: string;
  theme?: "default" | "modal";
  callback?: () => void;
  children: React.ReactNode;
};

function TitleBackStyle(title: string, callback: () => void): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"arrow-left"} onPress={callback} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"arrow-left"} />
    </View>
  );
}

function TitleModalStyle(title: string, callback: () => void): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"times"} onPress={callback} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"times"} />
    </View>
  );
}

export default function DefaultPage({
  title,
  theme,
  callback,
  children,
}: DefaultPageProps) {

  // with a callback you should ensure the user can navigate back somehow
  function goBack() {
    if (callback) {
      callback();
    } else {
      router.back();
    }
  }

  return (
    <PageContainer>
      <View style={globalStyles.contentContainer}>
        {theme === "modal"
          ? TitleModalStyle(title, goBack)
          : TitleBackStyle(title, goBack)}
        {children}
      </View>
    </PageContainer>
  );
}

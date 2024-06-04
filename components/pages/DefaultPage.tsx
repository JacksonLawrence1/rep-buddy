import { Text, View } from "react-native";
import { router } from "expo-router";

import IconButton from "@/components/buttons/IconButton";
import PageContainer from "@/components/pages/PageContainer";

import { globalStyles } from "@/constants/styles";

type theme = {
  icon: "back" | "modal";
  path: string; // a path must be supplied as a fallback
}

type DefaultPageProps = {
  title: string;
  theme?: theme;
  children: React.ReactNode;
};

// HACK: ideally, define exactly how a route goes back to main menu
function goBack(path: string | undefined) {
  if (router.canGoBack() && path !== undefined) {
    router.navigate(path);
  } else {
    router.replace('/');
  }
}

function TitleBackStyle(
  title: string,
  path: string | undefined,
): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton
        disabled={path === undefined}
        icon={"arrow-left"}
        onPress={() => goBack(path)}
      />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"arrow-left"} />
    </View>
  );
}

function TitleModalStyle(
  title: string,
  path: string,
): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"times"} onPress={() => goBack(path)} />
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
        {theme?.icon === "modal"
          ? TitleModalStyle(title, theme.path)
          : TitleBackStyle(title, theme?.path || undefined)}
        {children}
      </View>
    </PageContainer>
  );
}

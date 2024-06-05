import { Text, View } from "react-native";

import IconButton from "@/components/buttons/IconButton";
import PageContainer from "@/components/pages/PageContainer";

import { globalStyles } from "@/constants/styles";

type DefaultPageProps = {
  title: string;
  theme?: "default" | "modal";
  onBack: () => void;
  children: React.ReactNode;
};

function TitleBackStyle(
  title: string,
  onBack: () => void,
): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton
        icon={"arrow-left"}
        onPress={onBack}
      />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"arrow-left"} />
    </View>
  );
}

function TitleModalStyle(
  title: string,
  onBack: () => void,
): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"times"} onPress={onBack} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"times"} />
    </View>
  );
}

export default function DefaultPage({
  title,
  theme,
  onBack,
  children,
}: DefaultPageProps) {
  return (
    <PageContainer>
      <View style={globalStyles.contentContainer}>
        {theme === "modal"
          ? TitleModalStyle(title, onBack)
          : TitleBackStyle(title, onBack)}
        {children}
      </View>
    </PageContainer>
  );
}

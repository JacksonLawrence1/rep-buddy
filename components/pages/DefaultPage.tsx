import { Text, View } from "react-native";
import { router } from "expo-router";

import IconButton from "@/components/buttons/IconButton";
import PageContainer from "@/components/pages/PageContainer";

import { globalStyles } from "@/constants/styles";

type DefaultPageProps = {
  title: string;
  back?: boolean; // If we want to show a back button
  toggleModal?: () => void; // If we want to show a close button
  children: React.ReactNode;
};

function TitleBackStyle(title: string, back: boolean): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton disabled={!back} icon={"arrow-left"} onPress={router.back} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"arrow-left"} />
    </View>
  );
}

function TitleModalStyle(title: string, toggleModal: () => void): React.ReactNode {
  return (
    <View style={globalStyles.titleContainer}>
      <IconButton icon={"times"} onPress={toggleModal} />
      <Text style={globalStyles.title}>{title}</Text>
      <IconButton disabled={true} icon={"times"} />
    </View>
  );
}

export default function DefaultPage({
  title,
  back = false,
  children,
  toggleModal,
}: DefaultPageProps) {
  return (
    <PageContainer>
      <View style={globalStyles.contentContainer}>
        {toggleModal ? TitleModalStyle(title, toggleModal) : TitleBackStyle(title, back)}
        {children}
      </View>
    </PageContainer>
  );
}

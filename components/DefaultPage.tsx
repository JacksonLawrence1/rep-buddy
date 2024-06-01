import { Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { router } from "expo-router";

import IconButton from "@/components/Buttons/IconButton";
import PageContainer from "@/components/PageContainer";

import { globalStyles } from "@/constants/styles";

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
      <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.contentContainer}>
        <View style={globalStyles.titleContainer}>
          <IconButton disabled={!back} icon={"arrow-left"} onPress={router.back} />
          <Text style={globalStyles.title}>{title}</Text>
          <IconButton disabled={true} icon={"arrow-left"} />
        </View>
        {children}
      </View>
      </TouchableWithoutFeedback>
    </PageContainer>
  );
}

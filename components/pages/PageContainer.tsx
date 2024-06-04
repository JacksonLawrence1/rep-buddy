import { SafeAreaView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { globalStyles } from "@/constants/styles";
import { colors } from "@/constants/colors";

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <SafeAreaProvider style={{backgroundColor: colors.background}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={globalStyles.pageContainer}>
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

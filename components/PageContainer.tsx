import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { globalStyles } from "@/constants/styles";

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.pageContainer}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

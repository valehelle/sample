import { ScrollView, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = {
  children?: React.ReactNode;
  style?: ViewProps["style"];
};

export const Screen = ({ children, style }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={[{ flex: 1, paddingTop: insets.top }, style]}>
      {children}
    </ScrollView>
  );
};

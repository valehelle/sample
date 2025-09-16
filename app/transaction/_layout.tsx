import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import "react-native-reanimated";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function TransactionLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "transaction",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

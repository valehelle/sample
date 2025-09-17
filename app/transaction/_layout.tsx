import { Stack } from "expo-router";
import "react-native-reanimated";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function TransactionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "transaction",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          title: "success",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

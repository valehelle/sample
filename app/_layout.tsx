import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store/index";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useFonts({
    "ParafinaTrial-BoldL": require("../assets/fonts/ParafinaTrial-BoldL.otf"),
    "ParafinaTrial-BoldM": require("../assets/fonts/ParafinaTrial-BoldM.otf"),
    "ParafinaTrial-MediumM": require("../assets/fonts/ParafinaTrial-MediumM.otf"),
    "ParafinaTrial-RegularM": require("../assets/fonts/ParafinaTrial-RegularM.otf"),
    "ParafinaTrial-RegularS": require("../assets/fonts/ParafinaTrial-RegularS.otf"),
  });

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
          <Stack.Screen
            name="transaction"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}

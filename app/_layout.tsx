import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store/index";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  useFonts({
    "ParafinaTrial-BoldL": require("../assets/fonts/ParafinaTrial-BoldL.otf"),
    "ParafinaTrial-BoldM": require("../assets/fonts/ParafinaTrial-BoldM.otf"),
    "ParafinaTrial-MediumM": require("../assets/fonts/ParafinaTrial-MediumM.otf"),
    "ParafinaTrial-RegularM": require("../assets/fonts/ParafinaTrial-RegularM.otf"),
    "ParafinaTrial-RegularS": require("../assets/fonts/ParafinaTrial-RegularS.otf"),
  });

  useEffect(() => {
    const init = async () => {
      if (__DEV__) {
        await import("../mocks/msw.polyfills");
        const { server } = await import("../mocks/server");
        server.listen();
        console.log("✅ MSW is running");
      }
      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    // Don’t render the app until mocks (and other setup like fonts) are ready
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          r
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

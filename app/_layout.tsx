import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store/index";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useFonts({
    "ParafinaTrial-BlackL": require("../assets/fonts/ParafinaTrial-BlackL.otf"),
    "ParafinaTrial-BlackM": require("../assets/fonts/ParafinaTrial-BlackM.otf"),
    "ParafinaTrial-BlackS": require("../assets/fonts/ParafinaTrial-BlackS.otf"),
    "ParafinaTrial-BoldL": require("../assets/fonts/ParafinaTrial-BoldL.otf"),
    "ParafinaTrial-BoldM": require("../assets/fonts/ParafinaTrial-BoldM.otf"),
    "ParafinaTrial-BoldS": require("../assets/fonts/ParafinaTrial-BoldS.otf"),
    "ParafinaTrial-LightL": require("../assets/fonts/ParafinaTrial-LightL.otf"),
    "ParafinaTrial-LightM": require("../assets/fonts/ParafinaTrial-LightM.otf"),
    "ParafinaTrial-LightS": require("../assets/fonts/ParafinaTrial-LightS.otf"),
    "ParafinaTrial-MediumL": require("../assets/fonts/ParafinaTrial-MediumL.otf"),
    "ParafinaTrial-MediumM": require("../assets/fonts/ParafinaTrial-MediumM.otf"),
    "ParafinaTrial-MediumS": require("../assets/fonts/ParafinaTrial-MediumS.otf"),
    "ParafinaTrial-RegularL": require("../assets/fonts/ParafinaTrial-RegularL.otf"),
    "ParafinaTrial-RegularM": require("../assets/fonts/ParafinaTrial-RegularM.otf"),
    "ParafinaTrial-RegularS": require("../assets/fonts/ParafinaTrial-RegularS.otf"),
    "ParafinaTrial-ThinL": require("../assets/fonts/ParafinaTrial-ThinL.otf"),
    "ParafinaTrial-ThinM": require("../assets/fonts/ParafinaTrial-ThinM.otf"),
    "ParafinaTrial-ThinS": require("../assets/fonts/ParafinaTrial-ThinS.otf"),
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

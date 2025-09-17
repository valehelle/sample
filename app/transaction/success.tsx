import { Screen } from "@/components/screen";
import Button from "@/components/theme-button";
import { ThemedText } from "@/components/themed-text";
import { FontSize, Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TransactionScreen() {
  const router = useRouter();

  const donePressed = useCallback(() => {
    router.back();
  }, [router]);

  const insets = useSafeAreaInsets();
  return (
    <>
      <Screen>
        <View
          style={{
            marginTop: Spacing.md,
            paddingHorizontal: Spacing.lg,
            alignItems: "center",
          }}
        >
          <LottieView
            style={{ height: 200, width: 200, marginTop: Spacing.lg }}
            source={require("../../assets/lottie/success.json")}
            autoPlay
            loop={false}
          />
          <ThemedText type="title" style={{ fontSize: FontSize.xxxl }}>
            Success!
          </ThemedText>
        </View>
        <View>
          <ThemedText style={{ textAlign: "center", marginTop: Spacing.md }}>
            Your transaction was completed successfully.
          </ThemedText>
        </View>
      </Screen>
      <View
        style={{
          paddingHorizontal: Spacing.lg,
          marginBottom: Spacing.lg + insets.bottom,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Button
          style={{ width: "100%", paddingVertical: 12 }}
          label="Done"
          onPress={donePressed}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  aboveKeyboard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});

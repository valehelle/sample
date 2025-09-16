import Button from "@/components/Button";
import { Screen } from "@/components/screen";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyInput from "react-native-currency-input";

export default function TransactionScreen() {
  const [value, setValue] = useState(0.0);
  const [value1, setValue1] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
    Animated.spring(scale2, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
    Animated.spring(scale2, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const color = useThemeColor(
    {},
    isFocused || value !== 0.0 ? "text" : "textUnfocused"
  );
  const color2 = useThemeColor(
    {},
    isFocused2 || value1 !== "" ? "text" : "textUnfocused"
  );

  const router = useRouter();

  const buttonDisabled = value === 0.0 || value1 === "";
  return (
    <Screen>
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => router.back()}
        >
          <IconSymbol size={32} name="x.circle" color={"#000000"} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: Spacing.md, paddingHorizontal: Spacing.lg }}>
        <ThemedText>You send exactly</ThemedText>
        <Animated.View
          style={{
            marginTop: Spacing.sm,
            transform: [
              { scale },
              {
                translateX: Animated.multiply(Animated.subtract(scale, 1), 150),
              },
            ],
          }}
        >
          <CurrencyInput
            value={value}
            onChangeValue={(val) => setValue(val ?? 0)}
            returnKeyType="done"
            onFocus={handleFocus}
            prefix="RM "
            delimiter=","
            separator="."
            precision={2}
            keyboardType="number-pad"
            onBlur={handleBlur}
            style={{
              fontSize: 50,
              fontFamily: "ParafinaTrial-BoldM",
              color,
            }}
          />
        </Animated.View>
        <Text>
          Amount available: <Text style={{ fontWeight: "bold" }}>RM 12.32</Text>
        </Text>
      </View>
      <View style={{ marginTop: Spacing.lg, paddingHorizontal: Spacing.lg }}>
        <ThemedText>To account</ThemedText>

        <Animated.View
          style={{
            marginTop: Spacing.sm,
            transform: [
              { scale: scale2 },
              {
                translateX: Animated.multiply(
                  Animated.subtract(scale2, 1),
                  150
                ),
              },
            ],
          }}
        >
          <TextInput
            value={value1.toString()}
            onChangeText={(text) => setValue1(text)}
            returnKeyType="done"
            placeholder="123456789013"
            keyboardType="number-pad"
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            style={{
              fontSize: 50,
              fontFamily: "ParafinaTrial-BoldM",
              color: color2,
            }}
          />
        </Animated.View>
      </View>
      <View style={{ marginTop: Spacing.md, paddingHorizontal: Spacing.lg }}>
        <ThemedText>Optional Note</ThemedText>

        <TextInput
          multiline={true}
          numberOfLines={3}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginTop: Spacing.sm,
            textAlignVertical: "top",
            height: 100,
          }}
          returnKeyType="done"
        />
      </View>
      <View
        style={{
          paddingHorizontal: Spacing.lg,
          marginTop: Spacing.lg,
        }}
      >
        <Button
          style={{ width: "100%", paddingVertical: 12 }}
          label="Send"
          onPress={() => {}}
          disabled={buttonDisabled}
        />
      </View>
    </Screen>
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

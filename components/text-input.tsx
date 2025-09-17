import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRef, useState } from "react";
import {
  Animated,
  TextInput as ReactNativeTextInput,
  StyleSheet,
} from "react-native";

export const TextInput = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const textColor = useThemeColor(
    {},
    isFocused || value !== "" ? "text" : "textUnfocused"
  );

  const placeHolderTextColor = useThemeColor({}, "textUnfocused");

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

  return (
    <Animated.View
      style={[
        styles.animatedAccount,
        {
          transform: [
            { scale: scale },
            {
              translateX: Animated.multiply(Animated.subtract(scale, 1), 150),
            },
          ],
        },
      ]}
    >
      <ReactNativeTextInput
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        placeholder="123456789013"
        keyboardType="number-pad"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.accountInput, { color: textColor }]}
        placeholderTextColor={placeHolderTextColor}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    marginRight: 16,
  },
  section: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },

  currencyInput: {
    fontSize: 50,
    fontFamily: "ParafinaTrial-BoldM",
  },
  boldText: {
    fontWeight: "bold",
  },
  animatedAccount: {
    marginTop: Spacing.sm,
  },
  accountInput: {
    fontSize: 50,
    fontFamily: "ParafinaTrial-BoldM",
  },
  noteSection: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: Spacing.sm,
    textAlignVertical: "top",
    height: 100,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
  },
});

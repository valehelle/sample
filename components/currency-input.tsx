import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import ReactNativeCurrencyInput from "react-native-currency-input";

export const CurrencyInput = ({
  value,
  onChangeValue,
}: {
  value: number;
  onChangeValue: (value: number) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const textColor = useThemeColor(
    {},
    isFocused || value !== 0.0 ? "text" : "textUnfocused"
  );

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
        styles.animatedAmount,
        {
          transform: [
            { scale },
            {
              translateX: Animated.multiply(Animated.subtract(scale, 1), 150),
            },
          ],
        },
      ]}
    >
      <ReactNativeCurrencyInput
        value={value}
        onChangeValue={onChangeValue}
        returnKeyType="done"
        onFocus={handleFocus}
        prefix="RM "
        delimiter=","
        separator="."
        precision={2}
        keyboardType="number-pad"
        onBlur={handleBlur}
        style={[styles.currencyInput, { color: textColor }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  currencyInput: {
    fontSize: 50,
    fontFamily: "ParafinaTrial-BoldM",
  },
  animatedAmount: {
    marginTop: Spacing.sm,
  },
});

import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type ButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const buttonBackgroundColor = useThemeColor(
    {},
    disabled ? "buttonBackgroundDisabled" : "buttonBackground"
  );
  const buttonTextColor = useThemeColor(
    {},
    disabled ? "buttonTextDisabled" : "buttonText"
  );

  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: buttonBackgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, textStyle, { color: buttonTextColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;

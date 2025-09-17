import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemedText } from "./themed-text";

export const TextArea = ({
  value,
  onChangeText,
  label,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, [setIsFocused]);

  const borderColor = useThemeColor(
    {},
    isFocused || value !== "" ? "text" : "textUnfocused"
  );
  return (
    <>
      <ThemedText>{label}</ThemedText>
      <TextInput
        value={value}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={3}
        style={[styles.noteInput, { borderColor: borderColor }]}
        returnKeyType="done"
      />
    </>
  );
};

const styles = StyleSheet.create({
  noteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: Spacing.sm,
    textAlignVertical: "top",
    height: 100,
  },
});

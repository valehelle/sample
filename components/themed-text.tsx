import { StyleSheet, Text, type TextProps } from "react-native";

import { FontSize } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "system";
  fontFamily?: string; // allow override
};

const fontFamilyMap: Record<string, string | undefined> = {
  default: "ParafinaTrial-RegularM",
  system: undefined,
  defaultSemiBold: "ParafinaTrial-MediumM",
  title: "ParafinaTrial-BoldL",
  subtitle: "ParafinaTrial-BoldM",
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  fontFamily,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const resolvedFontFamily =
    type === "system"
      ? undefined
      : fontFamily || fontFamilyMap[type] || fontFamilyMap.default;

  return (
    <Text
      style={[
        { color, fontFamily: resolvedFontFamily },
        type === "default" ? styles.default : undefined,
        type === "system" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: FontSize.md,
  },
  defaultSemiBold: {
    fontSize: FontSize.md,
  },
  title: {
    fontSize: FontSize.xxl,
  },
  subtitle: {
    fontSize: FontSize.lg,
  },
  link: {
    fontSize: FontSize.md,
  },
});

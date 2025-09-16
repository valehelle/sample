import { StyleSheet, Text, type TextProps } from "react-native";

import { FontSize } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  fontFamily?: string; // allow override
};

const fontFamilyMap: Record<string, string> = {
  default: "ParafinaTrial-RegularM",
  defaultSemiBold: "ParafinaTrial-MediumM",
  title: "ParafinaTrial-BoldL",
  subtitle: "ParafinaTrial-BoldM",
  link: "ParafinaTrial-RegularS",
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
    fontFamily || fontFamilyMap[type] || fontFamilyMap.default;

  return (
    <Text
      style={[
        { color, fontFamily: resolvedFontFamily },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
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

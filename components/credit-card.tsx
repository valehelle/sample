import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

export const CreditCard = ({
  id,
  type,
  outstandingBalance,
  last4,
}: {
  id: number;
  type: string;
  outstandingBalance: number;
  last4: string;
}) => {
  const textLabel = useThemeColor({}, "textLabel");
  const backgroundColor = useThemeColor({}, "cardBackground");
  return (
    <View key={id} style={[styles.card, { backgroundColor }]}>
      <ThemedText type="defaultSemiBold" style={{ color: textLabel }}>
        {type.toUpperCase()}
      </ThemedText>
      <ThemedText
        type="defaultSemiBold"
        style={[styles.last4, { color: textLabel }]}
      >
        **** **** **** {last4}
      </ThemedText>
      <ThemedText type="title" style={styles.balance}>
        RM {outstandingBalance.toFixed(2)}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    minWidth: 250,
  },
  last4: {
    marginTop: Spacing.sm,
  },
  balance: {
    fontSize: 28,
    marginTop: Spacing.lg,
  },
});

import { ThemedText } from "@/components/themed-text";
import { FontSize, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export const TransactionItem = ({
  id,
  description,
  date,
  amount,
}: {
  id: number;
  description: string;
  date: string;
  amount: number;
}) => {
  return (
    <View key={id} style={styles.container}>
      <View>
        <ThemedText type="default" style={styles.description}>
          {description}
        </ThemedText>
        <ThemedText type="default" style={styles.date}>
          {date}
        </ThemedText>
      </View>
      <View style={styles.amountContainer}>
        <ThemedText type="system" style={styles.amount}>
          RM {amount.toFixed(2)}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: Spacing.sm,
  },
  description: {
    fontSize: FontSize.md,
  },
  date: {
    fontSize: FontSize.sm,
  },
  amountContainer: {
    flex: 1,
  },
  amount: {
    textAlign: "right",
    fontSize: FontSize.md,
  },
});

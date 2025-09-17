import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

import { CreditCard } from "@/components/credit-card";
import { Screen } from "@/components/screen";
import Button from "@/components/theme-button";
import { ThemedText } from "@/components/themed-text";
import { TransactionItem } from "@/components/transaction-item";
import { FontSize, Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useGetAccountQuery } from "@/services/ryt";
import { useRouter } from "expo-router";
import { useCallback } from "react";

interface CardType {
  id: number;
  type: string;
  last4: string;
  outstandingBalance: number;
}

export default function HomeScreen() {
  const { data, isLoading } = useGetAccountQuery();

  const router = useRouter();
  const sendPressed = useCallback(() => {
    router.navigate("/transaction");
  }, [router]);

  const textLabel = useThemeColor({}, "textLabel");

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <Screen>
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <View>
          <ThemedText type="defaultSemiBold" style={{ color: textLabel }}>
            Total balance
          </ThemedText>
          <ThemedText type="title" style={{ fontSize: FontSize.xxxl }}>
            RM {data?.currentAccount.balance}
          </ThemedText>
          <ThemedText type="default">{data?.currentAccount.name}</ThemedText>

          <ThemedText type="defaultSemiBold" style={{ color: textLabel }}>
            {data?.currentAccount.accountNumber}
          </ThemedText>
        </View>
        <View style={{ marginTop: Spacing.md, flexDirection: "row" }}>
          <View style={{ marginRight: Spacing.xs }}>
            <Button label="Send" onPress={sendPressed} />
          </View>
          <Button label="Add money" onPress={() => {}} />
        </View>
      </View>
      <View style={{ marginVertical: Spacing.lg }}>
        <FlatList
          data={data?.creditCards}
          keyExtractor={(item: CardType) => item.id.toString()}
          horizontal
          style={{ paddingLeft: Spacing.lg }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: CardType }) => (
            <TouchableOpacity style={{ marginRight: Spacing.md }}>
              <CreditCard
                id={item.id}
                type={item.type}
                last4={item.last4}
                outstandingBalance={item.outstandingBalance}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <ThemedText type="subtitle" style={{ fontSize: FontSize.lg }}>
          Transactions
        </ThemedText>
        <View style={{ marginTop: Spacing.sm }}>
          {data?.transactions.map((tx) => {
            return (
              <View key={tx.id} style={{ marginTop: Spacing.sm }}>
                <TransactionItem
                  id={tx.id}
                  description={tx.description}
                  date={tx.date}
                  amount={tx.amount}
                />
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

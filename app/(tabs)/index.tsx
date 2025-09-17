import { FlatList, TouchableOpacity, View } from "react-native";

import { CreditCard } from "@/components/credit-card";
import { Screen } from "@/components/screen";
import Button from "@/components/theme-button";
import { ThemedText } from "@/components/themed-text";
import { TransactionItem } from "@/components/transaction-item";
import { FontSize, Spacing } from "@/constants/theme";
import { useAppSelector } from "@/hooks/use-store";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  useGetPokemonByNameQuery,
  useUpdatePokemonMutation,
} from "@/services/pokemon";
import { selectCount } from "@/store/counterSlice";
import { useRouter } from "expo-router";
import { useCallback } from "react";

const TRANSACTIONS = [
  { id: 1, description: "Starbucks", date: "Feb 12", amount: 15.75 },
  { id: 2, description: "Amazon", date: "Feb 13", amount: 45.0 },
  {
    id: 3,
    description: "Uber",
    date: "Feb 14",
    amount: 23.5,
  },
  { id: 4, description: "Grocery Store", date: "Feb 15", amount: 89.3 },
  { id: 5, description: "Electricity Bill", date: "Feb 16", amount: 60.0 },
  { id: 6, description: "Gym Membership", date: "Feb 17", amount: 35.0 },
];

interface CardType {
  id: number;
  type: string;
  last4: string;
  outstandingBalance: number;
}

const CARDS: CardType[] = [
  {
    id: 1,
    type: "visa",
    last4: "4222",
    outstandingBalance: 119.23,
  },
  {
    id: 2,
    type: "amex",
    last4: "423",
    outstandingBalance: 1.23,
  },
];

export default function HomeScreen() {
  const count = useAppSelector(selectCount);

  const { data, error, isLoading } = useGetPokemonByNameQuery("heloo");

  console.log("data", error);
  const [updatePost, result] = useUpdatePokemonMutation();

  const router = useRouter();
  const sendPressed = useCallback(() => {
    router.navigate("/transaction");
  }, []);
  const textLabel = useThemeColor({}, "textLabel");
  return (
    <Screen>
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <View>
          <ThemedText type="defaultSemiBold" style={{ color: textLabel }}>
            Total balance
          </ThemedText>
          <ThemedText type="title" style={{ fontSize: FontSize.xxxl }}>
            RM 119.23
          </ThemedText>
          <ThemedText type="default">Savings Account-i</ThemedText>

          <ThemedText type="defaultSemiBold" style={{ color: textLabel }}>
            1624 4434 4343 4222
          </ThemedText>
        </View>
        <View style={{ marginTop: Spacing.md, flexDirection: "row" }}>
          <View style={{ marginRight: Spacing.xs }}>
            <Button label="Send" onPress={sendPressed} />
          </View>
          <Button label="Add money" onPress={() => {}} />
        </View>
      </View>
      <View style={{ marginTop: Spacing.md }}>
        <FlatList
          data={CARDS}
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
          {TRANSACTIONS.map((tx) => {
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

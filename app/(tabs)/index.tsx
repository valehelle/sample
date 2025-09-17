import { ScrollView, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import { Screen } from "@/components/screen";
import { ThemedText } from "@/components/themed-text";
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

const CARDS = [
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

const Transaction = ({
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
    <View key={id} style={{ flexDirection: "row", marginTop: Spacing.sm }}>
      <View>
        <ThemedText type="default" style={{ fontSize: FontSize.md }}>
          {description}
        </ThemedText>
        <ThemedText type="default" style={{ fontSize: FontSize.sm }}>
          {date}
        </ThemedText>
      </View>
      <View style={{ flex: 1 }}>
        <ThemedText
          type="system"
          style={{ textAlign: "right", fontSize: FontSize.md }}
        >
          RM {amount.toFixed(2)}
        </ThemedText>
      </View>
    </View>
  );
};

const Card = ({
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
    <View
      key={id}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 10,
        padding: 20,
        minWidth: 250,
      }}
    >
      <ThemedText type="defaultSemiBold" style={{ color: textLabel }}>
        {type.toUpperCase()}
      </ThemedText>
      <ThemedText
        type="defaultSemiBold"
        style={{ color: textLabel, marginTop: Spacing.sm }}
      >
        **** **** **** {last4}
      </ThemedText>
      <ThemedText type="title" style={{ fontSize: 28, marginTop: Spacing.lg }}>
        RM {outstandingBalance.toFixed(2)}
      </ThemedText>
    </View>
  );
};

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
        <ScrollView
          horizontal
          style={{
            paddingLeft: Spacing.lg,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {CARDS.map((card) => (
            <TouchableOpacity key={card.id} style={{ marginRight: Spacing.md }}>
              <Card
                id={card.id}
                type={card.type}
                last4={card.last4}
                outstandingBalance={card.outstandingBalance}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <ThemedText type="subtitle" style={{ fontSize: FontSize.lg }}>
          Transactions
        </ThemedText>
        <View style={{ marginTop: Spacing.sm }}>
          {TRANSACTIONS.map((tx) => {
            return (
              <View key={tx.id} style={{ marginTop: Spacing.sm }}>
                <Transaction
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

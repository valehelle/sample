import { CurrencyInput } from "@/components/currency-input";
import { IconSymbol } from "@/components/icon/icon-symbol";
import { Screen } from "@/components/screen";
import { TextArea } from "@/components/text-area";
import { TextInput } from "@/components/text-input";
import Button from "@/components/theme-button";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function TransactionScreen() {
  const [amount, setAmount] = useState(0.0);
  const [accountNumber, setAccountNumber] = useState("");

  const router = useRouter();

  const onSendPressed = useCallback(() => {
    router.replace("/transaction/success");
  }, [router]);
  const colorScheme = useColorScheme();
  const buttonDisabled = amount === 0.0 || accountNumber === "";

  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol
            size={32}
            name="x.circle"
            color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <ThemedText>You send exactly</ThemedText>

        <CurrencyInput
          value={amount}
          onChangeValue={(val) => setAmount(val ?? 0)}
        />
        <Text>
          Amount available: <Text style={styles.boldText}>RM 12.32</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <ThemedText>To account</ThemedText>

        <TextInput
          value={accountNumber.toString()}
          onChangeText={setAccountNumber}
        />
      </View>
      <View style={styles.noteSection}>
        <TextArea value="" onChangeText={() => {}} label="Optional Notes" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          label="Send"
          onPress={onSendPressed}
          disabled={buttonDisabled}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    marginRight: 16,
  },
  section: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },

  boldText: {
    fontWeight: "bold",
  },
  noteSection: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
  },
});

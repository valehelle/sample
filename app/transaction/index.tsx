import { CurrencyInput } from "@/components/currency-input";
import { IconSymbol } from "@/components/icon/icon-symbol";
import { Screen } from "@/components/screen";
import { TextArea } from "@/components/text-area";
import { TextInput } from "@/components/text-input";
import Button from "@/components/theme-button";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useAppDispatch } from "@/hooks/use-store";
import {
  useCreateTransactionMutation,
  useGetAccountQuery,
} from "@/services/ryt";
import { setLastResult } from "@/store/transactionSlice";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function TransactionScreen() {
  const { data } = useGetAccountQuery();
  const dispatch = useAppDispatch();
  const [createTransaction, { isLoading, error, isError, reset }] =
    useCreateTransactionMutation();
  const [amount, setAmount] = useState(0.0);
  const [accountNumber, setAccountNumber] = useState("");
  const [optionalNotes, setOptionalNotes] = useState("");

  const router = useRouter();

  const onSendPressed = useCallback(() => {
    LocalAuthentication.authenticateAsync({
      biometricsSecurityLevel: "strong",
    }).then((result) => {
      if (result.success) {
        createTransaction({
          amount: amount,
          accountNumber: accountNumber,
          optionalNotes: optionalNotes,
        }).then((resp) => {
          if (resp.data?.success) {
            dispatch(setLastResult(resp.data.transaction));
            router.replace("/transaction/success");
          }
        });
      } else {
        Alert.alert("Authentication failed", "Please try again.");
      }
    });
  }, [
    dispatch,
    createTransaction,
    optionalNotes,
    amount,
    accountNumber,
    router,
  ]);
  const colorScheme = useColorScheme();
  const buttonDisabled = amount === 0.0 || accountNumber === "";

  const onRequestClose = useCallback(() => {
    reset();
  }, [reset]);
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
        <ThemedText type="system" style={styles.amountAvailable}>
          Amount available:{" "}
          <Text style={styles.boldText}>RM {data?.currentAccount.balance}</Text>
        </ThemedText>
      </View>
      <View style={styles.section}>
        <ThemedText>To account</ThemedText>

        <TextInput
          value={accountNumber.toString()}
          onChangeText={setAccountNumber}
        />
      </View>
      <View style={styles.noteSection}>
        <TextArea
          value={optionalNotes}
          onChangeText={setOptionalNotes}
          label="Optional Notes"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          isLoading={isLoading}
          style={styles.button}
          label="Send"
          onPress={onSendPressed}
          disabled={buttonDisabled}
        />
      </View>
      <Modal
        visible={isError}
        transparent
        animationType="fade"
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={onRequestClose}>
                <IconSymbol
                  name="x.circle"
                  size={25}
                  color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
                />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.modalText} type="system">
              {(error as any)?.data?.message}
            </ThemedText>
          </View>
        </View>
      </Modal>
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
  amountAvailable: { fontSize: 12 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

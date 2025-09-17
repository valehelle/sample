import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

// Define the type for a transaction result
interface TransactionResult {
  amount: number;
  accountNumber: string;
  optionalNotes: string;
}

// Define the slice state
interface TransactionState {
  lastResult?: TransactionResult;
}

const initialState: TransactionState = {
  lastResult: undefined,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setLastResult: (state, action: PayloadAction<TransactionResult>) => {
      state.lastResult = action.payload;
    },
    clearLastResult: (state) => {
      state.lastResult = undefined;
    },
  },
});

// Actions
export const { setLastResult, clearLastResult } = transactionSlice.actions;

// Selector
export const selectLastTransaction = (state: RootState) =>
  state.transaction.lastResult;

// Reducer
export default transactionSlice.reducer;

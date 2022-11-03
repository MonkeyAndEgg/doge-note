import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Transaction } from "../../models/transaction";

export interface TransactionState {
  transactions: Transaction[];
  totalTransactions: number;
}

const initialState: TransactionState = {
  transactions: [],
  totalTransactions: 0,
}

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload.transactions;
      state.totalTransactions = action.payload.totalTransactions;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.transaction
      };
    }
  }
});

export const { setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
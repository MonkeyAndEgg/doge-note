import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Transaction } from "../../models/transaction";

export interface TransactionState {
  transactions: Transaction[];
  years: number[]; // all the years the current transactions data included
  totalTransactions: number;
}

const initialState: TransactionState = {
  transactions: [],
  years: [],
  totalTransactions: 0,
}

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload.transactions;
      state.totalTransactions = action.payload.totalTransactions;
    },
    setYears(state, action) {
      state.years = action.payload.years;
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

export const { setTransactions, setYears } = transactionSlice.actions;

export default transactionSlice.reducer;
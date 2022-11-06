import { useDispatch } from "react-redux";
import { Transaction } from "../models/transaction";
import { setTransactions } from "../store/slices/transactionSlice";
import apiRequest from "../util/apiRequest";
import errorHandler from "../util/errorHandler";

export default function useTransactionCrud() {
  const dispatch = useDispatch();

  const loadTransactions = async () => {
    try {
      const res = await apiRequest('/api/transaction', {
        method: 'GET',
      });
  
      const parsedData = await res.json();
      if (parsedData) {
        // update transaction state with returned data 
        dispatch(setTransactions({ transactions: parsedData.transactions, totalTransactions: parsedData.transactions.length }));
      }
    } catch(e) {
      errorHandler(e);
    }
  }

  const addTransaction = async (transaction: Transaction) => {
    try {
      await apiRequest('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction)
      });
    } catch(e) {
      errorHandler(e);
    }
  };
  
  return {
    addTransaction,
    loadTransactions
  };
}
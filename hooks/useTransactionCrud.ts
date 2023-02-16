import { useDispatch } from "react-redux";
import { Transaction } from "../models/transaction";
import { setTransactions } from "../store/slices/transactionSlice";
import apiRequest from "../util/apiRequest";
import errorHandler from "../util/errorHandler";
import { Transaction as TransactionSchema } from "@prisma/client";

export default function useTransactionCrud() {
  const dispatch = useDispatch();

  const loadTransactions = async (year?: string) => {
    try {
      let url = '/api/transactions';
      if (year) {
        url += `?year=${year}`;
      }
      const res = await apiRequest(url, {
        method: 'GET',
      });
  
      const parsedData: { transactions: TransactionSchema[] } = await res.json();
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
      await apiRequest('/api/transactions', {
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

  const deleteTransaction = async (id: string) => {
    try {
      await apiRequest(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
    } catch(e) {
      errorHandler(e);
    }
  };
  
  return {
    addTransaction,
    loadTransactions,
    deleteTransaction,
  };
}
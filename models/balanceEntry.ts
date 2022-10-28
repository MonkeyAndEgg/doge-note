import { CATEGORY } from "./category";
import { BALANCE_ENTRY_TYPE } from "./type";

export interface BalanceEntry {
  description: string;
  category: CATEGORY;
  type: BALANCE_ENTRY_TYPE;
  amount: number;
}
import { Dayjs } from "dayjs";
import { BALANCE_ENTRY_TYPE } from "./type";

export interface Transaction {
  description: string;
  tags: string[];
  type: BALANCE_ENTRY_TYPE;
  time: Dayjs;
  amount: number;
}
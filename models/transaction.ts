import { Type } from "@prisma/client";
import { Dayjs } from "dayjs";

export interface Transaction {
  id?: string;
  description: string;
  tags: string[];
  type: Type;
  date: Dayjs;
  amount: number;
}
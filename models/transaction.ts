import { Type } from "@prisma/client";
import { Dayjs } from "dayjs";

export interface Transaction {
  description: string;
  tags: string[];
  type: Type;
  date: Dayjs;
  amount: number;
}
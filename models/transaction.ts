import { Type } from "@prisma/client";

export interface Transaction {
  description: string;
  tags: string[];
  type: Type;
  date: Date;
  amount: number;
}
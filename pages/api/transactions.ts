// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import errorHandler from '../../util/errorHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    const { description, tags, type, date, amount } = req.body;
    try {
      const transaction = await prisma.transaction.create({
        data: {
          description,
          tags,
          type,
          date,
          amount,
        } as Prisma.TransactionCreateInput
      });

      res.status(200).send(transaction);
    } catch(e) {
      errorHandler(e);
      res.status(500).send({
        message: 'Internal server error'
      });
    }
  } else {
    try {
      const transactions = await prisma.transaction.findMany({});

      res.status(200).send({
        transactions
      });
    } catch(e) {
      errorHandler(e);
      res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}

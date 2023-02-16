import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import errorHandler from '../../../util/errorHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { transactionId } = req.query

  if (req.method === 'DELETE') {
    try {
      const transaction = await prisma.transaction.delete({
        where: {
          id: transactionId as string
        }
      });

      res.status(200).send(transaction);
    } catch(e) {
      errorHandler(e);
      res.status(500).send({
        message: 'Internal server error'
      });
    }
  } else if (req.method === 'POST') {

  } else if (req.method === 'GET') {
    
  }
}
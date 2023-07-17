import { StockOperationDisplayOptions } from 'src/types/stockOperation';
import { client } from 'src/utils/client';

export const getMaxSolution = async (startDate: string, endDate: string, amount: number) => {
      const res = await client<StockOperationDisplayOptions>(`solution`,{
        method: 'POST',
        body: { startDate, endDate, amount: amount.toString() },
      });
      if (!res.data) {
        throw new Error('Error');
      }
  return res?.data
};

export const getAllSolutions = async (startDate: string, endDate: string, amount: number) => {
  const res = await client<StockOperationDisplayOptions>(`solution/all/`,{
    method: 'POST',
    body: { startDate, endDate, amount: amount.toString() },
  });
  if (!res.data) {
    throw new Error('Error');
  }
return res?.data
};
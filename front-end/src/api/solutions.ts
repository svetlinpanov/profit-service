import { StockOperationDisplayOptions } from 'src/types/stockOperation';
import { client } from 'src/utils/client';

export const getMaxSolution = async (startDate: string, endDate: string, amount: number) => {
      const res = await client<StockOperationDisplayOptions>(`solution/?startDate=${startDate}&endDate=${endDate}&amount=${amount.toString()}`);
      if (!res.data) {
        throw new Error('Error');
      }
  return res?.data
};

export const getAllSolutions = async (startDate: string, endDate: string, amount: number) => {
  const res = await client<StockOperationDisplayOptions>(`solution/all/?startDate=${startDate}&endDate=${endDate}&amount=${amount}`);
  if (!res.data) {
    throw new Error('Error');
  }
return res?.data
};
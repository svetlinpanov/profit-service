import { useMutation } from 'react-query';
import { getAllSolutions, getMaxSolution } from 'src/api/solutions';
import { StockOperationDisplayOptions, StockOperationRequestOptions } from 'src/types/stockOperation';

export const useGetMaxSolution = () => {
    return useMutation<StockOperationDisplayOptions[], Error, StockOperationRequestOptions>(async (props: { startDate: Date, endDate: Date, amount: number }) => {
        const startDateString = props.startDate.toISOString();
        const endDateString = props.endDate.toISOString();
        return getMaxSolution(startDateString, endDateString, props.amount);
    });
};

export const useGetAllSolutions = () => {
    return useMutation<StockOperationDisplayOptions[], Error, StockOperationRequestOptions>(async (props: { startDate: Date, endDate: Date, amount: number }) => {
        const startDateString = props.startDate.toISOString();
        const endDateString = props.endDate.toISOString();
        return getAllSolutions(startDateString, endDateString, props.amount);
    });
};
  
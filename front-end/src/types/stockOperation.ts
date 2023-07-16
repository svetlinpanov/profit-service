export interface StockOperationDisplayOptions {
    stockName: string;
    buyPrice: number;
    sellPrice: number;
    startDate: Date;
    endDate: Date;
    duration: number;
    profit: number;
  }

export interface StockOperationRequestOptions {
    startDate: Date;
    endDate: Date;
    amount: number;
}
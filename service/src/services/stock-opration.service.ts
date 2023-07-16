import { APIError } from "@/api-error";
import { StockOperation, StockOperationModel } from "@/schemas/stock";
import { injectable } from "inversify";

@injectable()
export class StockOperationService {
  public async getStockData(startDate: Date, endDate: Date) {
    const data = await StockOperationModel.find(
      {
        timestamp: { $gte: startDate, $lte: endDate },
      },
      { _id: 0, __v: 0 },
    )
      .sort({ timestamp: 1 })
      .lean();
    if (data.length === 0 || !data) {
      throw new APIError(404, "No data found for the requested date range");
    }
    return data;
  }

  public async getMostProfitableSolution(startDate: Date, endDate: Date, amount: number) {
    const stockData = await this.getStockData(startDate, endDate);
    const allMaxSolutions = this.findSolutions(stockData);

    const minDuration = Math.min(...allMaxSolutions.map(solution => solution.duration));
    const minDurationSolution = allMaxSolutions.filter(
      solution => solution.duration === minDuration,
    );
    return minDurationSolution.map(solution => {
      return {
        stockName: solution.minElement.symbol,
        buyPrice: solution.minElement.price,
        sellPrice: solution.maxElement.price,
        startDate: solution.minElement.timestamp,
        endDate: solution.maxElement.timestamp,
        duration: solution.duration,
        profit: solution.difference * amount,
      };
    });
  }

  public async getAllProfitableSolution(startDate: Date, endDate: Date, amount: number) {
    const stockData = await this.getStockData(startDate, endDate);
    const solutions = this.findSolutions(stockData);
    const result = solutions
      .map(solution => {
        return {
          stockName: solution.minElement.symbol,
          buyPrice: solution.minElement.price,
          sellPrice: solution.maxElement.price,
          startDate: solution.minElement.timestamp,
          endDate: solution.maxElement.timestamp,
          duration: solution.duration,
          profit: solution.difference * amount,
        };
      })
      .sort((a, b) => a.duration - b.duration);
    return result;
  }

  private findSolutions(stockData: StockOperation[]): {
    minElement: StockOperation;
    maxElement: StockOperation;
    difference: number;
    duration: number;
  }[] {
    let maxDifference = -1;
    let minElement = stockData[0];
    let maxElement = stockData[0];
    const solutions = new Array<{
      minElement: StockOperation;
      maxElement: StockOperation;
      difference: number;
      duration: number;
    }>();
    for (let i = 1; i < stockData.length; ++i) {
      if (stockData[i].price > minElement.price) {
        const currentDifference = stockData[i].price - minElement.price;
        if (currentDifference >= maxDifference) {
          maxElement = stockData[i];
          solutions.push({
            minElement,
            maxElement,
            difference: currentDifference,
            duration:
              (maxElement.timestamp.getTime() - minElement.timestamp.getTime()) / 1000,
          });
        }
        maxDifference = Math.max(maxDifference, currentDifference);
      }
      minElement = minElement.price < stockData[i].price ? minElement : stockData[i];
    }

    const allMaxSolutions = solutions.filter(
      solution => solution.difference === maxDifference,
    );
    return allMaxSolutions;
  }
}

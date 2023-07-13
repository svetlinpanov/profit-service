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
    ).lean();
    if (!data) {
      throw new APIError(404, "No data found for the requested date range");
    }
    return data;
  }

  public async getMostProfitableSolution(startDate: Date, endDate: Date) {
    const stockData = await this.getStockData(startDate, endDate);
    const result = this.findSolution(stockData);
    return result;
  }

  private findSolution(stockData: StockOperation[]) {
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
            duration: maxElement.timestamp.getTime() - minElement.timestamp.getTime(),
          });
        }
        maxDifference = Math.max(maxDifference, currentDifference);
      }
      minElement = minElement.price < stockData[i].price ? minElement : stockData[i];
    }

    const allMaxSolutions = solutions.filter(
      solution => solution.difference === maxDifference,
    );
    if (allMaxSolutions.length === 1) {
      return allMaxSolutions[0];
    }
    const minDuration = Math.min(...allMaxSolutions.map(solution => solution.duration));
    const minDurationSolution = solutions.find(
      solution => solution.duration === minDuration,
    );
    return minDurationSolution;
  }
}

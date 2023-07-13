import { StockOperation, StockOperationModel, StockOperationType } from "@/schemas/stock";
import { injectable } from "inversify";
import moment from "moment";
import { v4 as uuid } from "uuid";

@injectable()
export class DataGeneratorService {
  async createStockData(startDate: Date, endDate: Date) {
    const batchSize = 1000;
    //const secondsInOneMonth = 60 * 60 * 24 * 30;
    //const secondsInOneDay = 60 * 60 * 24;
    //total seconds between startDate and endDate
    const secondsBetweenDates = (endDate.getTime() - startDate.getTime()) / 1000;
    const pages = secondsBetweenDates / batchSize;
    let totalCreated = 0;
    for (let index = 0; index < pages; index++) {
      totalCreated += await this.batchCreateStockOperations(
        moment(startDate)
          .add(index * batchSize, "seconds")
          .toDate(),
        batchSize,
      );
      console.log(`Created ${totalCreated} stock operations`);
    }
  }

  // For the sake of simplicity, we will generate random data for only one stock, MEME,
  // and round the numbers so we can get duplicates and test the performance of the database.
  async batchCreateStockOperations(startDate: Date, batchSize: number): Promise<number> {
    const stockOperations = new Array<StockOperation>();
    for (let i = 0; i < batchSize; i++) {
      const stockOperation = {
        id: uuid(),
        timestamp: moment(startDate).add(i, "seconds").toDate(),
        price: Math.round(Math.random() * 100) + 1,
        // quantity: Math.round(Math.random() * 100),
        // type:
        //   Math.round(Math.random()) === 1
        //     ? StockOperationType.BUY
        //     : StockOperationType.SELL,
        symbol: "MEME",
      };
      stockOperations.push(stockOperation);
    }
    await StockOperationModel.insertMany(stockOperations);
    return stockOperations.length;
  }
}

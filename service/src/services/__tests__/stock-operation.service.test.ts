import { StockOperationModel } from "@/schemas/stock";
import { StockOperationService } from "@/services";
import { v4 as uuidv4 } from "uuid";

beforeEach(async () => {
  await StockOperationModel.deleteMany({});
});
it("getStockData should return all the stock data between the given dates", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-03"),
      price: 300,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  const result = await stockOperationService.getStockData(
    new Date("2021-01-02"),
    new Date("2021-01-03"),
  );
  expect(result.length).toEqual(2);
});
it("getStockData should return all the stock data between the given dates sorted by timestamp", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-03"),
      price: 300,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  const result = await stockOperationService.getStockData(
    new Date("2021-01-02"),
    new Date("2021-01-03"),
  );
  expect(result[0].timestamp).toEqual(new Date("2021-01-02"));
});
it("getStockData should throw if there are no stock operations between the given dates", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  await expect(
    stockOperationService.getStockData(new Date("2022-01-04"), new Date("2021-01-05")),
  ).rejects.toThrow();
});

it("getMostProfitableSolution should return the most profitable solution", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-03"),
      price: 300,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  const amount = 100;
  const result = await stockOperationService.getMostProfitableSolution(
    new Date("2021-01-01"),
    new Date("2021-01-03"),
    amount,
  );
  expect(result).toEqual([
    {
      startDate: stockOperations[0].timestamp,
      buyPrice: stockOperations[0].price,
      endDate: stockOperations[2].timestamp,
      sellPrice: stockOperations[2].price,
      duration:
        (stockOperations[2].timestamp.getTime() -
          stockOperations[0].timestamp.getTime()) /
        1000,
      profit: (stockOperations[2].price - stockOperations[0].price) * amount,
      stockName: stockOperations[0].symbol,
    },
  ]);
});

it("getMostProfitableSolution should return the most profitable solution even with more complex data", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-03"),
      price: 300,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-04"),
      price: 200,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-05"),
      price: 200,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-06"),
      price: 400,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  const amount = 100;
  const result = await stockOperationService.getMostProfitableSolution(
    new Date("2021-01-01"),
    new Date("2021-01-06"),
    amount,
  );
  expect(result).toEqual([
    {
      startDate: stockOperations[0].timestamp,
      buyPrice: stockOperations[0].price,
      endDate: stockOperations[5].timestamp,
      sellPrice: stockOperations[5].price,
      duration:
        (stockOperations[5].timestamp.getTime() -
          stockOperations[0].timestamp.getTime()) /
        1000,
      profit: (stockOperations[5].price - stockOperations[0].price) * amount,
      stockName: stockOperations[0].symbol,
    },
  ]);
});

it("getMostProfitableSolution should return the most profitable and the shortest solution", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-03"),
      price: 300,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-04"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-05"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-10"),
      price: 300,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  const amount = 100;
  const result = await stockOperationService.getMostProfitableSolution(
    new Date("2021-01-01"),
    new Date("2021-01-10"),
    amount,
  );
  expect(result).toEqual([
    {
      startDate: stockOperations[0].timestamp,
      buyPrice: stockOperations[0].price,
      endDate: stockOperations[2].timestamp,
      sellPrice: stockOperations[2].price,
      duration:
        (stockOperations[2].timestamp.getTime() -
          stockOperations[0].timestamp.getTime()) /
        1000,
      profit: (stockOperations[2].price - stockOperations[0].price) * amount,
      stockName: stockOperations[0].symbol,
    },
  ]);
});

it("getAllMostProfitableSolution should return the all most profitable solutions even if they are longer", async () => {
  const stockOperationService = new StockOperationService();
  const stockOperations = [
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-01"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-02"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-03"),
      price: 300,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-04"),
      price: 100,
      symbol: "MEME",
    },
    {
      id: uuidv4(),
      timestamp: new Date("2021-01-05"),
      price: 200,
      symbol: "MEME",
    },

    {
      id: uuidv4(),
      timestamp: new Date("2021-01-10"),
      price: 300,
      symbol: "MEME",
    },
  ];
  await StockOperationModel.insertMany(stockOperations);
  const amount = 100;
  const result = await stockOperationService.getAllProfitableSolution(
    new Date("2021-01-01"),
    new Date("2021-01-10"),
    amount,
  );
  expect(result).toEqual([
    {
      startDate: stockOperations[0].timestamp,
      buyPrice: stockOperations[0].price,
      endDate: stockOperations[2].timestamp,
      sellPrice: stockOperations[2].price,
      duration:
        (stockOperations[2].timestamp.getTime() -
          stockOperations[0].timestamp.getTime()) /
        1000,
      profit: (stockOperations[2].price - stockOperations[0].price) * amount,
      stockName: stockOperations[0].symbol,
    },
    {
      startDate: stockOperations[3].timestamp,
      buyPrice: stockOperations[3].price,
      endDate: stockOperations[5].timestamp,
      sellPrice: stockOperations[5].price,
      duration:
        (stockOperations[5].timestamp.getTime() -
          stockOperations[3].timestamp.getTime()) /
        1000,
      profit: (stockOperations[5].price - stockOperations[3].price) * amount,
      stockName: stockOperations[3].symbol,
    },
  ]);
});

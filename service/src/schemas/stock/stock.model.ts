import { model, Schema } from "mongoose";
import { StockOperation } from "./stock.schema";

const stockOperationMongooseSchema = new Schema<StockOperation>({
  id: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true, index: true },
  price: { type: Number, required: true },
  //   quantity: { type: Number, required: true },
  //   type: { type: String, required: true },
  symbol: { type: String, required: true },
});

export const StockOperationModel = model("stock-operation", stockOperationMongooseSchema);

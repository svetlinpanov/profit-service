import { Middleware } from "koa";
import { injectable } from "inversify";
import { requestSchema, stockResponseSchema } from "@/schemas/stock";
import { setResponse, validateRequest } from ".";
import { StockOperationService } from "@/services";

@injectable()
export class StockOperationController {
  constructor(private stockOperationService: StockOperationService) {}

  public getMostProfitableSolution: Middleware = async ctx => {
    const { query } = validateRequest(ctx, {
      query: requestSchema,
    });
    const { startDate, endDate, amount } = query;
    console.log(query);
    const result = await this.stockOperationService.getMostProfitableSolution(
      new Date(startDate),
      new Date(endDate),
      Number(amount),
    );
    setResponse(ctx, stockResponseSchema, result);
  };

  public getAllProfitableSolution: Middleware = async ctx => {
    const { query } = validateRequest(ctx, {
      query: requestSchema,
    });
    const { startDate, endDate, amount } = query;
    console.log(query);
    const result = await this.stockOperationService.getAllProfitableSolution(
      new Date(startDate),
      new Date(endDate),
      Number(amount),
    );
    setResponse(ctx, stockResponseSchema, result);
  };
}

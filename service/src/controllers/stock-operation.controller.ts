import { Middleware } from "koa";
import { injectable } from "inversify";
import { requestSchema } from "@/schemas/stock";
import { validateRequest } from ".";
import { StockOperationService } from "@/services";

@injectable()
export class StockOperationController {
  constructor(private stockOperationService: StockOperationService) {}

  public getData: Middleware = async ctx => {
    const { query } = validateRequest(ctx, {
      query: requestSchema,
    });
    const { startDate, endDate } = query;
    console.log(query);
    const result = await this.stockOperationService.getMostProfitableSolution(
      new Date(startDate),
      new Date(endDate),
    );
    ctx.body = { result };
    ctx.status = 200;
  };
}

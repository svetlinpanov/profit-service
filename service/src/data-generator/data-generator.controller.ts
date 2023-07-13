import { Middleware, ParameterizedContext } from "koa";
import { injectable } from "inversify";
import { DataGeneratorService } from "./data-generator.service";
import { generateRequestSchema } from "./request.schema";
import { validateRequest } from "@/controllers";

@injectable()
export class DataGeneratorController {
  constructor(private dataGeneratorService: DataGeneratorService) {}

  public generateData: Middleware = async ctx => {
    const { body } = validateRequest(ctx, {
      body: generateRequestSchema,
    });
    const { startDate, endDate } = body;
    this.dataGeneratorService.createStockData(new Date(startDate), new Date(endDate));
    ctx.body = { message: "db creation in progress" };
    ctx.status = 200;
  };
}

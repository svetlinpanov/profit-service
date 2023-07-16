import { StockOperationController } from "@/controllers";
import { injectable } from "inversify";
import Router from "koa-router";

@injectable()
export class MainRouter {
  public readonly router: Router;

  constructor(private stockOperationController: StockOperationController) {
    this.router = new Router({ prefix: "/api/v1" });
    this.init();
  }

  private init(): void {
    this.router.get("/health-check", ctx => {
      ctx.body = { status: 200, message: "ok" };
      ctx.status = 200;
    });
    this.router.get("/solution", this.stockOperationController.getMostProfitableSolution);
    this.router.get(
      "/solution/all",
      this.stockOperationController.getAllProfitableSolution,
    );
  }
}

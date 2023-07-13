import { StockOperationController } from "@/controllers";
import { injectable } from "inversify";
import Router from "koa-router";

// import {
//   CategoryController,
//   FollowerController,
//   ReportController,
//   ThreadController,
//   ThreadRepliesController,
//   UserController,
//   VotingController,
// } from "../controllers";

@injectable()
export class MainRouter {
  public readonly router: Router;

  constructor(private stockOperationController: StockOperationController) {
    this.router = new Router({ prefix: "/profit/v1" });
    this.init();
  }

  private init(): void {
    this.router.get("/health-check", ctx => {
      ctx.body = { status: 200, message: "ok" };
      ctx.status = 200;
    });
    this.router.get("/stock", this.stockOperationController.getData);
  }
}

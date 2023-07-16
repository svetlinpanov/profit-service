import { injectable } from "inversify";
import Router from "koa-router";
import { DataGeneratorController } from "./data-generator.controller";

@injectable()
export class DataGenerationRouter {
  public readonly router: Router;

  constructor(private dataGeneratorController: DataGeneratorController) {
    this.router = new Router({ prefix: "/api/v1/generate" });
    this.init();
  }

  // prettier-ignore
  private init(): void {

    this.router.post("/", this.dataGeneratorController.generateData);
  }
}

import { injectable } from "inversify";
import Router from "koa-router";
import { DataGeneratorController } from "./data-generator.controller";

@injectable()
export class DataGenerationRouter {
  public readonly router: Router;

  constructor(private dataGeneratorController: DataGeneratorController) {
    this.router = new Router({ prefix: "/profit/v1/generate" });
    this.init();
  }

  // prettier-ignore
  private init(): void {

    this.router.post("/", this.dataGeneratorController.generateData);
    // this.router.post("/step1", this.migrationController.step1);
    // this.router.post("/step2/test/:threadId", this.migrationController.testStep2);
    // this.router.post("/step2", this.migrationController.step2);
    // this.router.post("/step3/test/:nickname", this.migrationController.testStep3);
    // this.router.post("/step3", this.migrationController.step3);
  }
}

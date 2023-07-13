import { injectable } from "inversify";
import Koa, { Middleware } from "koa";
import bodyParser from "koa-bodyparser";
import koaLogger from "koa-logger";
import cors from "@koa/cors";
import { logger, mongooseLoader } from "./system";
import { APIError } from "./api-error";
import { ZodError } from "zod";
import { fromZodError, ValidationError } from "zod-validation-error";
import { DataGenerationRouter } from "./data-generator";
import { MainRouter } from "./routers";

@injectable()
export class App {
  private app: Koa;
  PORT = process.env.PORT || 8000;

  constructor(
    private mainRouter: MainRouter,
    private dataGenerationRouter: DataGenerationRouter,
  ) {
    // private v2Router: V2Router, // private threadRouter: ThreadRouter, // private mainRouter: MainRouter,
    this.app = new Koa();
    this.app.use(this.errorHandlerMiddleware);
    this.app.use(bodyParser());
    this.app.use(koaLogger());
    this.app.use(cors());
    this.initRoutes();
  }

  private errorHandlerMiddleware: Middleware = async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      // TODO: Handle zod error
      if (error instanceof ZodError) {
        error = fromZodError(error);
        error.status = 400;
      }

      // TODO: Handle json error

      ctx.status = error.status || 500;
      ctx.body = {
        status: error.status || 500,
        message:
          error instanceof APIError ||
          error instanceof ValidationError ||
          error instanceof SyntaxError
            ? error.message
            : "Internal Server Error",
        // Add code and clientMessage if they exist
        ...(error.code && { code: error.code }),
        ...(error.clientMessage && { clientMessage: error.clientMessage }),
        ...(error.preventLogout && { preventLogout: error.preventLogout }),
      };

      ctx.app.emit("error", error, ctx);
    }
  };

  private initRoutes(): void {
    this.app.use(this.mainRouter.router.routes());
    this.app.use(this.dataGenerationRouter.router.routes());
    // this.app.use(this.v2Router.router.routes());
    // this.app.use(this.migrationRouter.router.routes());
  }

  public async start(): Promise<Koa.DefaultState> {
    await this.initDatabases();

    return this.app
      .listen(this.PORT, async () => {
        logger.info(`Server listening on port: ${this.PORT}`);
      })
      .on("error", err => {
        logger.error(err);
      });
  }

  private async initDatabases() {
    await mongooseLoader();
    logger.info("Database connections initialized");
  }
}

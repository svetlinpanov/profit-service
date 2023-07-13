import { container } from "./inversify.config";
import "reflect-metadata";
import { App } from "./app";
import dotenv from "dotenv";

dotenv.config();
const application = container.get<App>(App);

application.start();

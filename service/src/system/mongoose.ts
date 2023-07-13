import mongoose from "mongoose";
import { logger, conf } from "../system";

export const mongooseLoader = async () => {
  mongoose.connection.on("connecting", () => {
    logger.info("Mongoose connecting");
  });
  mongoose.connection.on("connected", () => {
    logger.info("Mongoose default connection is open to ", conf.mongoAddr);
  });
  mongoose.connection.on("disconnected", function () {
    logger.info("Mongoose default connection is disconnected");
  });
  mongoose.connection.on("reconnected", function () {
    logger.info("Mongoose default connection is reconnected");
  });
  mongoose.connection.on("error", err => {
    logger.error(err);
  });
  const connection = await mongoose.connect(conf.mongoAddr, { dbName: conf.dbName });
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  return connection;
};

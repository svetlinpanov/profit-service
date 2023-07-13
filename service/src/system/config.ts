import dotenv from "dotenv";

dotenv.config();

let auth = "";
if (process.env.NODE_ENV !== "test") {
  const user = process.env["mongo.auth.user"] || "";
  const password = process.env["mongo.auth.password"] || "";
  auth = `${user}:${password}@`;
}
const url = process.env["mongo.url"] || "";

export const conf = {
  mongoAddr: `mongodb+srv://${auth}${url}`,
  swagger: process.env.swagger || false,
  dbName: "profit",
};

// if (process.env.NODE_ENV == "local") {
//   conf.mongoAddr = `mongodb+srv://${auth}${url}`;
// }

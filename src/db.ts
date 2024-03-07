import { Client } from "pg";
import config from "./db_secret";

const client = new Client(config);

export const getConnection = async () => {
  console.log("CONNECT TO DB");
  return client.connect();
}
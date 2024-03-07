import { Client } from "pg";
import config from "./db_secret";

export const getConnection = async () => {
  console.log("CONNECT TO DB");
  const client = new Client(config);
  await client.connect();
  return client;
}
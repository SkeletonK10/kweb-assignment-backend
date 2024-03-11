import { Client } from "pg";
import { dbConfig } from "./secret";

export const getConnection = async () => {
  const client = new Client(dbConfig);
  await client.connect();
  return client;
}
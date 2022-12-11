import { open } from "sqlite";
import sqlite3 from "sqlite3";

export default async function () {
  return open({
    filename: './public/databases/dbPerpus',
    driver: sqlite3.Database
  })
}

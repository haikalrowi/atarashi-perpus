import { open } from "sqlite";
import sqlite3 from "sqlite3";

export default async function () {
  return open({
    filename: './public/dbPerpus.db',
    driver: sqlite3.cached.Database
  })
}

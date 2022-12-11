import { open } from "sqlite";
import sqlite3 from "sqlite3";

export default async function () {
  return open({
    filename: './pages/database/dbPerpus',
    driver: sqlite3.Database
  })
}

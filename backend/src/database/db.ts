import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function openDb() {
  return open({
    filename: path.resolve(__dirname, '../../banco-de-dados/db-pi-joia-laco.db'),
    driver: sqlite3.Database
  });
}

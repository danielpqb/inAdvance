import * as SQLite from "expo-sqlite";

function openDB(name: string) {
  const db = SQLite.openDatabase(name);
  return db;
}

async function initDB(db: SQLite.SQLiteDatabase, resetDB?: boolean) {
  await db.transactionAsync(async (tx) => {
    if (resetDB) {
      await tx.executeSqlAsync("DROP TABLE customers;");
      await tx.executeSqlAsync("DROP TABLE loans;");
      await tx.executeSqlAsync("DROP TABLE installments;");
    }
    await tx.executeSqlAsync(
      "CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);"
    );
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INT NOT NULL,
        total INT NOT NULL,
        description TEXT NOT NULL,
        maxInstallments INT NOT NULL
    );
    `
    );
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS installments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number INT NOT NULL,
        maxInstallments INT NOT NULL,
        date TEXT NOT NULL,
        isPaid INT NOT NULL,
        value INT NOT NULL,
        loanId INT NOT NULL
    );
    `
    );
  });
}

const sqliteServices = { openDB, initDB };
export default sqliteServices;

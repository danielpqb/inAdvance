import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre que o banco é chamado.
 */
db.transaction((tx) => {
  // tx.executeSql("DROP TABLE customers;");
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);"
  );
});
db.transaction((tx) => {
  // tx.executeSql("DROP TABLE installments;");
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS installments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          number INT NOT NULL,
          maxInstallments INT NOT NULL,
          date TEXT NOT NULL,
          isPaid INT NOT NULL,
          value INT NOT NULL,
          loanId INT NOT NULL,
          FOREIGN KEY(loanId) REFERENCES loans(id) ON UPDATE CASCADE ON DELETE CASCADE
        );
      `
  );
});
db.transaction((tx) => {
  // tx.executeSql("DROP TABLE loans;");
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS loans (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customerId INT NOT NULL,
          total INT NOT NULL,
          description TEXT NOT NULL,
          maxInstallments INT NOT NULL,
          FOREIGN KEY(customerId) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE
        );
      `
  );
});

export default db;

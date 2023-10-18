import db from "./db";

type TLoanDB = {
  id: number;
  customerName: string;
  total: number;
  description: string;
  maxInstallments: number;
};

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre que app é iniciado. (Somente se outro arquivo chamar esse arquivo)
 */
db.transaction((tx) => {
  // tx.executeSql("DROP TABLE loans;");
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT NOT NULL,
        total INT NOT NULL,
        description TEXT NOT NULL,
        maxInstallments INT NOT NULL,
        FOREIGN KEY(customerName) REFERENCES customers(name) ON UPDATE CASCADE ON DELETE CASCADE
      );
    `
  );
});

/**
 * @returns Object created
 */
async function create(obj: Omit<TLoanDB, "id">) {
  let id = 0;
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "INSERT INTO loans (customerName, total, description, maxInstallments) values (?, ?, ?, ?);",
        [obj.customerName, obj.total, obj.description, obj.maxInstallments]
      );
      id = res.insertId ?? 0;
      if (!id) {
        throw "Failed to create new register.";
      }
    });
    return { ...obj, id: id } as TLoanDB;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @returns Array of objects found
 */
async function findAll() {
  let all: any[] = [];
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("SELECT * FROM loans;", []);
      all = res.rows;
      if (!all.length) {
        throw "Failed to find any data.";
      }
    });
    return all as TLoanDB[];
  } catch (error) {
    throw error;
  }
}

/**
 * @returns Number of rows deleted
 */
async function remove(id: number) {
  let affected = 0;
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("DELETE FROM loans WHERE id=?;", [
        id,
      ]);
      affected = res.rowsAffected;
      if (affected < 1) {
        throw "Failed to delete register.";
      }
    });
    return affected;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const loanDB = {
  create,
  findAll,
  remove,
};

export default loanDB;

import db from "./db";

type TCustomerDB = {
  id: number;
  name: string;
};

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre que app é iniciado. (Somente se outro arquivo chamar esse arquivo)
 */
db.transaction((tx) => {
  // tx.executeSql("DROP TABLE customers;");
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);"
  );
});

/**
 * @returns Object created
 */
async function create(obj: Omit<TCustomerDB, "id">) {
  let id = 0;
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "INSERT INTO customers (name) values (?);",
        [obj.name]
      );
      id = res.insertId ?? 0;
      if (!id) {
        throw "Failed to create new register.";
      }
    });
    return { ...obj, id: id } as TCustomerDB;
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @returns Array of objects found
 */
async function findAll() {
  let all: any[] = [];
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("SELECT * FROM customers;", []);
      all = res.rows;
      if (!all.length) {
        throw "Failed to find any data.";
      }
    });
    return all as TCustomerDB[];
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @returns Number of rows deleted
 */
async function remove(id: number) {
  let affected = 0;
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("DELETE FROM customers WHERE id=?;", [
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
    return;
  }
}

const customerDB = {
  create,
  findAll,
  remove,
};

export default customerDB;

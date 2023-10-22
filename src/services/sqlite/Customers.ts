import { TCustomerDB } from "@/types/Customer";
import db from "./db";

/**
 * @returns true/false
 */
async function customerNameExists(name: string) {
  let exists = true;
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync(
      "SELECT * FROM customers WHERE name=?;",
      [name]
    );
    exists = res.rows.length > 0;
  });
  return exists;
}

/**
 * @returns true/false
 */
async function customerIdExists(id: number) {
  let exists = true;
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync(
      "SELECT * FROM customers WHERE id=?;",
      [id]
    );
    exists = res.rows.length > 0;
  });
  return exists;
}

/**
 * @returns Object created
 */
async function createOrFail(obj: Omit<TCustomerDB, "id">) {
  let id = 0;
  await db.transactionAsync(async (tx) => {
    const name = obj.name.trim();
    const customerExists = await customerNameExists(name);
    if (customerExists) {
      throw "Nome de cliente já existe.";
    }

    const res = await tx.executeSqlAsync(
      "INSERT INTO customers (name) VALUES (?);",
      [name]
    );
    id = res.insertId ?? 0;
    if (!id) {
      throw "Erro ao criar novo cliente.";
    }
  });
  return { ...obj, id: id, name: obj.name.trim() } as TCustomerDB;
}

/**
 * @returns Object found
 */
async function find(id: number) {
  let obj = null;
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync(
      "SELECT * FROM customers WHERE id=?;",
      [id]
    );
    const exists = res.rows.length > 0;
    if (exists) {
      obj = res.rows[0];
    }
  });
  return obj as TCustomerDB | null;
}

/**
 * @returns Array of objects found
 */
async function findAll() {
  let all: any[] = [];
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync("SELECT * FROM customers;", []);
    all = res.rows;
  });
  return all as TCustomerDB[];
}

/**
 * @returns Number of rows deleted
 */
async function remove(id: number) {
  let affected = 0;
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync("DELETE FROM customers WHERE id=?;", [
      id,
    ]);
    affected = res.rowsAffected;
  });
  return affected;
}

const customerDB = {
  customerIdExists,
  customerNameExists,
  createOrFail,
  find,
  findAll,
  remove,
};

export default customerDB;

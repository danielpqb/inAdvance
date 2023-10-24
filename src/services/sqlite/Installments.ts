import { TInstallmentDB } from "@/types/Installment";
import * as SQLite from "expo-sqlite";

function installmentsService(db: SQLite.SQLiteDatabase) {
  /**
   * @returns Object created
   */
  async function createOrFail(obj: Omit<TInstallmentDB, "id">) {
    let id = 0;
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "INSERT INTO installments (number, maxInstallments, date, isPaid, value, loanId) VALUES (?, ?, ?, ?, ?, ?);",
        [
          obj.number,
          obj.maxInstallments,
          obj.date,
          obj.isPaid,
          obj.value,
          obj.loanId,
        ]
      );
      id = res.insertId ?? 0;
      if (!id) {
        throw "Erro ao criar nova parcela de empréstimo.";
      }
    });
    return { ...obj, id: id } as TInstallmentDB;
  }

  /**
   * @returns Array of objects created
   */
  async function createManyOrFail(array: Omit<TInstallmentDB, "id">[]) {
    let createdObjects = [] as TInstallmentDB[];
    await db.transactionAsync(async () => {
      array.forEach(async (obj) => {
        const createdObj = await createOrFail(obj);
        createdObjects.push(createdObj);
      });
    });
    return createdObjects;
  }

  /**
   * @returns Array of objects found
   */
  async function findAll() {
    let all: any[] = [];
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("SELECT * FROM installments;", []);
      all = res.rows;
    });
    return all as TInstallmentDB[];
  }

  /**
   * @returns Number of rows deleted
   */
  async function remove(id: number) {
    let affected = 0;
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "DELETE FROM installments WHERE id=?;",
        [id]
      );
      affected = res.rowsAffected;
    });
    return affected;
  }

  /**
   * @returns Number of rows deleted
   */
  async function removeMany(ids: number[]) {
    let affected = 0;
    await db.transactionAsync(async (tx) => {
      ids.forEach(async (id) => {
        affected += await remove(id);
      });
    });
    return affected;
  }

  /**
   * @returns Number of rows updated
   */
  async function updateIsPaidOrFail(data: { id: number; isPaid: number }) {
    let affected = 0;
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "UPDATE installments SET isPaid=? WHERE id=?;",
        [data.isPaid, data.id]
      );
      affected = res.rowsAffected;
      if (affected < 1) {
        throw "Falha ao atualizar status da parcela.";
      }
    });
    return affected;
  }

  const installmentsService = {
    createOrFail,
    createManyOrFail,
    findAll,
    remove,
    removeMany,
    updateIsPaidOrFail,
  };
  
  return installmentsService;
}

export default installmentsService;

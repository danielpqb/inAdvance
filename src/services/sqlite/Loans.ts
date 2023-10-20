import { TLoanDB } from "@/types/Loan";
import customerDB from "./Customers";
import db from "./db";
import installmentDB from "./Installments";
import { getUtcDateNowString } from "@/utils/date-converter";
import { TInstallmentDB } from "@/types/Installment";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre que app é iniciado. (Somente se outro arquivo chamar esse arquivo)
 */
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

/**
 * @returns Object created
 */
async function createOrFail(obj: Omit<TLoanDB, "id">) {
  const exists = await customerDB.customerIdExists(obj.customerId);
  if (!exists) throw `Não existe um cliente com (id: ${obj.customerId}).`;

  let id = 0;
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync(
      "INSERT INTO loans (customerId, total, description, maxInstallments) values (?, ?, ?, ?);",
      [obj.customerId, obj.total, obj.description, obj.maxInstallments]
    );
    id = res.insertId ?? 0;
    if (!id) {
      throw "Erro ao criar novo empréstimo.";
    }

    const newInstallments = [] as Omit<TInstallmentDB, "id">[];
    for (let i = 1; i <= obj.maxInstallments; i++) {
      newInstallments.push({
        loanId: id,
        isPaid: 0,
        number: i,
        maxInstallments: obj.maxInstallments,
        value: obj.total / obj.maxInstallments,
        date: getUtcDateNowString({ offsetMonths: i }),
      });
    }

    installmentDB.createManyOrFail(newInstallments);
  });

  return { ...obj, id: id } as TLoanDB;
}

/**
 * @returns Array of objects found
 */
async function findAll() {
  let all: any[] = [];
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync(
      `SELECT *, customers.name AS customerName
      FROM loans
      JOIN customers ON loans.customerId = customers.id;`,
      []
    );
    all = res.rows;
  });
  return all as (TLoanDB & { customerName: string })[];
}

/**
 * @returns Number of rows deleted
 */
async function remove(id: number) {
  let affected = 0;
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync("DELETE FROM loans WHERE id=?;", [id]);
    affected = res.rowsAffected;
    if (affected < 1) {
      throw "Nenhum empréstimo foi removido.";
    }
  });
  return affected;
}

const loanDB = {
  createOrFail,
  findAll,
  remove,
};

export default loanDB;

import { TAllData, TCustomersObj, TLoansObj } from "@/types/All";
import db from "./db";

/**
 * @returns Array of objects found
 */
async function allData() {
  let all = [] as TAllData[];
  await db.transactionAsync(async (tx) => {
    const res = await tx.executeSqlAsync(
      `SELECT 
          installments.id AS installmentId,
          installments.number AS number,
          installments.date AS date,
          installments.isPaid AS isPaid,
          installments.value AS value,
          loans.id AS loanId,
          loans.total AS total,
          loans.description AS description,
          loans.maxInstallments AS maxInstallments,
          customers.id AS customerId,
          customers.name AS name
        FROM installments
        JOIN loans ON loans.id = installments.loanId
        JOIN customers ON customers.id = loans.customerId;`,
      []
    );
    all = res.rows as TAllData[];
  });

  const loansObj = {} as TLoansObj;
  all.forEach((row) => {
    const loanIdExist = !!loansObj[row.loanId] as boolean;
    if (!loanIdExist) {
      loansObj[row.loanId] = {
        customerId: row.customerId,
        remainToPay: row.isPaid ? 0 : row.value,
        paid: row.isPaid,
      };
    } else {
      if (!row.isPaid) {
        loansObj[row.loanId]["remainToPay"] += row.value;
      }
      loansObj[row.loanId]["paid"] += row.isPaid;
    }
  });

  const customersObj = {} as TCustomersObj;
  for (const loanId in loansObj) {
    const { customerId, remainToPay } = loansObj[loanId];

    const customerIdExists = !!customersObj[customerId] as boolean;
    if (!customerIdExists) {
      customersObj[customerId] = { remainToPay: remainToPay };
    } else {
      customersObj[customerId].remainToPay += remainToPay;
    }
  }

  return { loans: loansObj, customers: customersObj, all: all };
}

const allDB = {
  allData,
};

export default allDB;

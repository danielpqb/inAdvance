export type TLoan = {
  id: number;
  customerName: string;
  total: number;
  description: string;
  maxInstallments: number;
  paidInstallments: number;
};

export type TLoanDB = {
  id: number;
  customerId: number;
  total: number;
  description: string;
  maxInstallments: number;
};

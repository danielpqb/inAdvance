export type TAllData = {
  customerId: number;
  data: string;
  description: string;
  installmentId: number;
  isPaid: number;
  loanId: number;
  maxInstallments: number;
  name: string;
  number: number;
  total: number;
  value: number;
};

export type TCustomersObj = {
  [loanId: number]: {remainToPay: number};
};

export type TLoansObj = {
  [loanId: number]: { customerId: number; remainToPay: number; paid: number };
};

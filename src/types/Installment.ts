export type TInstallment = {
  id: number;
  number: number;
  installments: number;
  date: string;
  status: "Pago" | "Atrasado" | "Aguardando";
  value: number;
};

export type TInstallmentDB = {
  id: number;
  number: number;
  maxInstallments: number;
  date: string;
  isPaid: number;
  value: number;
  loanId: number;
};

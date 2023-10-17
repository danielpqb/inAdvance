export type TInstallment = {
  id: number;
  number: number;
  installments: number;
  date: string;
  status: "Pago" | "Atrasado" | "Aguardando";
  value: number;
};

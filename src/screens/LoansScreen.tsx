import LoanCard from "@/components/LoanCard";
import ScrollContainer from "@/components/ScrollContainer";
import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    gap: 10,
    padding: 15,
    justifyContent: "flex-start",
  },
  text: {
    color: gSC("zinc200"),
    fontSize: 50,
    paddingBottom: 20,
  },
});

const loansData = [
  {
    id: 1,
    name: "Isabel Pereira Queiroz Barros",
    total: 156000,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
  {
    id: 2,
    name: "Daniel Pereira Queiroz Barros",
    total: 23410,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
  {
    id: 3,
    name: "Vanessa Gomes Queiroz Barros",
    total: 52000,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
  {
    id: 4,
    name: "Julia Pereira Queiroz Barros",
    total: 2159070,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
  {
    id: 5,
    name: "Leonardo Queiroz Barros",
    total: 716000,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
  {
    id: 6,
    name: "Marília Gomes",
    total: 1061030,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
  {
    id: 7,
    name: "Juliane Carneiro",
    total: 122002,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
    maxInstallments: 12,
    paidInstallments: 10,
  },
];

type TLoansScreenProps = {};
const LoansScreen: FC<TLoansScreenProps> = () => {
  return (
    <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
      <View style={{ ...styles.view }}>
        {loansData.map((data, idx) => {
          return (
            <LoanCard
              key={idx}
              data={data}
            />
          );
        })}
      </View>
    </ScrollContainer>
  );
};

export default LoansScreen;

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
    name: "Isabel Pereira Queiroz Barros",
    total: 156000,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
  {
    name: "Daniel Pereira Queiroz Barros",
    total: 23410,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
  {
    name: "Vanessa Gomes Queiroz Barros",
    total: 52000,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
  {
    name: "Julia Pereira Queiroz Barros",
    total: 2159070,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
  {
    name: "Leonardo Queiroz Barros",
    total: 716000,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
  {
    name: "Marília Gomes",
    total: 1061030,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
  {
    name: "Juliane Carneiro",
    total: 122002,
    description:
      "Sapato preto de muitas funcionalidades que deve ser usado diariamente para conforto dos pés",
  },
];

type TLoansScreenProps = {};
const LoansScreen: FC<TLoansScreenProps> = () => {
  return (
    <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
      <View style={{ ...styles.view }}>
        {loansData.map((data) => {
          return <LoanCard data={data} />;
        })}
      </View>
    </ScrollContainer>
  );
};

export default LoansScreen;

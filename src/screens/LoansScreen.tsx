import LoanCard from "@/components/LoanCard";
import ScrollContainer from "@/components/ScrollContainer";
import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import loanDB from "@/services/sqlite/Loans";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    gap: 10,
    padding: 15,
    justifyContent: "flex-start",
    flex: 1,
  },
  text: {
    color: gSC("zinc100", 0.5),
    fontSize: 20,
    paddingBottom: 20,
    flex: 1,
    textAlign: "center",
    verticalAlign: "middle",
    marginBottom: 60,
  },
});

type TLoansScreenProps = {};
const LoansScreen: FC<TLoansScreenProps> = () => {
  const { data: loansData } = useQuery({
    queryKey: ["loans"],
    queryFn: loanDB.findAll,
  });

  return (
    <>
      {loansData ? (
        <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
          <View style={{ ...styles.view }}>
            {loansData.map((data, idx) => {
              return (
                <LoanCard
                  key={idx}
                  data={{ ...data, paidInstallments: 0 }}
                />
              );
            })}
          </View>
        </ScrollContainer>
      ) : (
        <Text style={{ ...styles.text }}>
          Não há empréstimos registrados...
        </Text>
      )}
    </>
  );
};

export default LoansScreen;

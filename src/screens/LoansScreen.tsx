import LoanCard from "@/components/LoanCard";
import ScrollContainer from "@/components/ScrollContainer";
import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import loanDB from "@/services/sqlite/Loans";
import allDB from "@/services/sqlite/All";

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
  const {
    data: loansData,
    status,
    error,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: loanDB.findAll,
  });

  const {
    data: allData,
    status: allDataStatus,
    error: allDataError,
  } = useQuery({
    queryKey: ["allData"],
    queryFn: allDB.allData,
  });

  if (status === "pending" || allDataStatus === "pending") {
    return <Text style={{ ...styles.text }}>Carregando...</Text>;
  }

  if (status === "error" || allDataStatus === "error") {
    return (
      <Text style={{ ...styles.text, color: gSC("red600") }}>
        {error?.message}
        {"\n"}
        {allDataError?.message}
      </Text>
    );
  }

  if (
    status === "success" &&
    allDataStatus === "success" &&
    loansData.length > 0
  ) {
    return (
      <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
        <View style={{ ...styles.view }}>
          {loansData.map((data, idx) => {
            return (
              <LoanCard
                key={idx}
                data={{
                  ...data,
                  paidInstallments: allData.loans[data.id]?.paid ?? 0,
                  customerName: data.customerName,
                }}
              />
            );
          })}
        </View>
      </ScrollContainer>
    );
  }

  return (
    <Text style={{ ...styles.text }}>Não há empréstimos registrados...</Text>
  );
};

export default LoansScreen;

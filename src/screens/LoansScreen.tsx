import LoanCard from "@/components/LoanCard";
import ScrollContainer from "@/components/ScrollContainer";
import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useDatabaseContext } from "@/contexts/DatabaseContext";
import { useNavigationContext } from "@/contexts/NavigationContext";

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
  },
});

type TLoansScreenProps = {};
const LoansScreen: FC<TLoansScreenProps> = () => {
  const { selectedCustomer } = useNavigationContext();
  const { services } = useDatabaseContext();
  const {
    data: loansData,
    status,
    error,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: services.loans.findAll,
  });

  const {
    data: allData,
    status: allDataStatus,
    error: allDataError,
  } = useQuery({
    queryKey: ["allData"],
    queryFn: services.all.allData,
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
      <ScrollContainer style={{ paddingTop: 0 }}>
        <View style={{ ...styles.view }}>
          {loansData
            .filter((loan) => {
              if (selectedCustomer?.id) {
                return loan.customerId === selectedCustomer.id;
              }
              return true;
            })
            .map((data, idx) => {
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

import { StyleSheet, View, Text } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import CustomerCard from "@/components/CustomerCard";
import ScrollContainer from "@/components/ScrollContainer";
import { useQuery } from "@tanstack/react-query";
import { useDatabaseContext } from "@/contexts/DatabaseContext";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    gap: 10,
    padding: 15,
    justifyContent: "flex-start",
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

type TCustomersScreenProps = {};
const CustomersScreen: FC<TCustomersScreenProps> = () => {
  const { services } = useDatabaseContext();
  const {
    data: customersData,
    status,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: services.customers.findAll,
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
    customersData.length > 0
  ) {
    return (
      <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
        <View style={{ ...styles.view }}>
          {customersData.map((data, idx) => {
            return (
              <CustomerCard
                key={idx}
                data={{
                  ...data,
                  total: allData.customers[data.id]?.remainToPay ?? 0,
                }}
              />
            );
          })}
        </View>
        <Text>{}</Text>
      </ScrollContainer>
    );
  }

  return <Text style={{ ...styles.text }}>Não há clientes registrados...</Text>;
};

export default CustomersScreen;

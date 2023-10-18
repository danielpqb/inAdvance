import { StyleSheet, View, Text } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import CustomerCard from "@/components/CustomerCard";
import ScrollContainer from "@/components/ScrollContainer";
import customerDB from "@/services/sqlite/Customers";
import { useQuery } from "@tanstack/react-query";

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
  const { data: customersData } = useQuery({
    queryKey: ["customers"],
    queryFn: customerDB.findAll,
  });

  return (
    <>
      {customersData ? (
        <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
          <View style={{ ...styles.view }}>
            {customersData.map((data, idx) => {
              return (
                <CustomerCard
                  key={idx}
                  data={{ ...data, total: 0 }}
                />
              );
            })}
          </View>
        </ScrollContainer>
      ) : (
        <Text style={{ ...styles.text }}>
          Não há clientes registrados...
        </Text>
      )}
    </>
  );
};

export default CustomersScreen;

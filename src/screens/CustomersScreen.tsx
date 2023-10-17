import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import CustomerCard from "@/components/CustomerCard";
import ScrollContainer from "@/components/ScrollContainer";

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

const customersData = [
  { id: 1, name: "Isabel Pereira Queiroz Barros", total: 156000 },
  { id: 2, name: "Daniel Pereira Queiroz Barros", total: 23410 },
  { id: 3, name: "Vanessa Gomes Queiroz Barros", total: 52000 },
  { id: 4, name: "Julia Pereira Queiroz Barros", total: 2159070 },
  { id: 5, name: "Leonardo Queiroz Barros", total: 716000 },
  { id: 6, name: "Marília Gomes", total: 1061030 },
  { id: 7, name: "Juliane Carneiro", total: 122002 },
];

type TCustomersScreenProps = {};
const CustomersScreen: FC<TCustomersScreenProps> = () => {
  return (
    <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
      <View style={{ ...styles.view }}>
        {customersData.map((data, idx) => {
          return (
            <CustomerCard
              key={idx}
              data={data}
            />
          );
        })}
      </View>
    </ScrollContainer>
  );
};

export default CustomersScreen;

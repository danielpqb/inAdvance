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
  { name: "Isabel Pereira Queiroz Barros", total: 156000 },
  { name: "Daniel Pereira Queiroz Barros", total: 23410 },
  { name: "Vanessa Gomes Queiroz Barros", total: 52000 },
  { name: "Julia Pereira Queiroz Barros", total: 2159070 },
  { name: "Leonardo Queiroz Barros", total: 716000 },
  { name: "Marília Gomes", total: 1061030 },
  { name: "Juliane Carneiro", total: 122002 },
];

type TCustomersScreenProps = {};
const CustomersScreen: FC<TCustomersScreenProps> = () => {
  return (
    <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
      <View style={{ ...styles.view }}>
        {customersData.map((data) => {
          return <CustomerCard data={data} />;
        })}
      </View>
    </ScrollContainer>
  );
};

export default CustomersScreen;

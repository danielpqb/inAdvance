import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";
import { useAppContext } from "@/contexts/AppContext";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { router } from "expo-router";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    backgroundColor: gSC("white", 0.1),
    padding: 15,
    flex: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: gSC("zinc300", 0.2),
    gap: 10,
    width: "100%",
  },
  name: {
    color: gSC("zinc100"),
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  totalView: {
    ...gStyles.growCenter,
    flex: 0,
  },
  totalLabel: {
    color: gSC("zinc100", 0.5),
    fontSize: 14,
    fontWeight: "600",
  },
  totalNumber: {
    color: gSC("yellow300"),
    fontSize: 24,
    fontWeight: "700",
  },
  button: {
    backgroundColor: undefined,
    padding: undefined,
    borderWidth: 0,
    width: "100%",
  },
});

type TCustomerCardProps = {
  data: {
    name: string;
    total: number;
  };
};
const CustomerCard: FC<TCustomerCardProps> = ({ data }) => {
  const { changeNavigationMode } = useAppContext();

  return (
    <Button
      style={{ ...styles.button }}
      onLongPress={() => {
        changeNavigationMode("delete");
      }}
      onPress={() => {
        router.push("/loans")
      }}
    >
      <View style={{ ...styles.view }}>
        <Text style={{ ...styles.name }}>{data.name}</Text>
        <View style={{ ...styles.totalView }}>
          <Text style={{ ...styles.totalLabel }}>Total a Pagar</Text>
          <Text style={{ ...styles.totalNumber }}>
            <Text style={{ fontSize: 16 }}>R$ </Text>
            {monetaryNumberToString(data.total)}
          </Text>
        </View>
      </View>
    </Button>
  );
};

export default CustomerCard;

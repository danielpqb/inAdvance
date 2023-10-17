import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";
import { useAppContext } from "@/contexts/AppContext";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    backgroundColor: gSC("white", 0.1),
    padding: 10,
    flex: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: gSC("zinc300", 0.2),
    gap: 5,
    width: "100%",
  },
  button: {
    backgroundColor: undefined,
    padding: undefined,
    borderWidth: 0,
    width: "100%",
  },
  infoView: {
    width: "100%",
  },
  label: { fontSize: 12, fontWeight: "600", color: gSC("zinc100", 0.5) },
  text: { fontSize: 14, fontWeight: "500", color: gSC("zinc100") },
  bottomView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomInfoView: { marginTop: 5 },
  bottomInfoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: gSC("zinc100", 0.5),
  },
  bottomInfoText: { fontSize: 24, fontWeight: "700", color: gSC("yellow300") },
});

type TLoanCardProps = {
  data: {
    name: string;
    total: number;
    description: string;
    maxInstallments: number;
    paidInstallments: number;
  };
};
const LoanCard: FC<TLoanCardProps> = ({ data }) => {
  const { changeNavigationMode } = useAppContext();

  return (
    <Button
      style={{ ...styles.button }}
      onLongPress={() => {
        changeNavigationMode("delete");
      }}
      onPress={async () => {
        console.warn("Navegar para Parcelas desse empréstimo!");
      }}
    >
      <View style={{ ...styles.view }}>
        <View style={{ ...styles.infoView }}>
          <Text style={{ ...styles.label }}>Cliente</Text>
          <Text style={{ ...styles.text }}>{data.name}</Text>
        </View>
        <View style={{ ...styles.infoView }}>
          <Text style={{ ...styles.label }}>Descrição</Text>
          <Text style={{ ...styles.text }}>{data.description}</Text>
        </View>
        <View style={{ ...styles.bottomView }}>
          <View style={{ ...styles.bottomInfoView }}>
            <Text style={{ ...styles.bottomInfoLabel }}>Restante a Pagar</Text>
            <Text style={{ ...styles.bottomInfoText }}>
              <Text style={{ fontSize: 16 }}>R$ </Text>
              {monetaryNumberToString(123456)}
            </Text>
          </View>
          <View style={{ ...styles.bottomInfoView }}>
            <Text style={{ ...styles.bottomInfoLabel, textAlign: "right" }}>
              Parcelas Pagas
            </Text>
            <Text style={{ ...styles.bottomInfoText, textAlign: "right" }}>
              {data.paidInstallments}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: gSC("zinc100"),
                }}
              >{` / ${data.maxInstallments}`}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Button>
  );
};

export default LoanCard;

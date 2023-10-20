import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";
import { useAppContext } from "@/contexts/AppContext";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { router } from "expo-router";
import { TLoan } from "@/types/Loan";
import allDB from "@/services/sqlite/All";
import { useQuery } from "@tanstack/react-query";

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
  data: TLoan;
};
const LoanCard: FC<TLoanCardProps> = ({ data }) => {
  const { changeNavigationMode, setSelectedLoan } = useAppContext();

  const { data: allData, status: allDataStatus } = useQuery({
    queryKey: ["allData"],
    queryFn: allDB.allData,
  });

  return (
    <>
      {allDataStatus === "success" ? (
        <Button
          style={{ ...styles.button }}
          onLongPress={() => {
            changeNavigationMode("delete");
          }}
          onPress={() => {
            setSelectedLoan(data);
            router.push(`/loans/${data.id}`);
          }}
        >
          <View style={{ ...styles.view }}>
            <View style={{ ...styles.infoView }}>
              <Text style={{ ...styles.label }}>Cliente</Text>
              <Text style={{ ...styles.text }}>{data.customerName}</Text>
            </View>
            <View style={{ ...styles.infoView }}>
              <Text style={{ ...styles.label }}>Descrição</Text>
              <Text style={{ ...styles.text }}>{data.description}</Text>
            </View>
            <View style={{ ...styles.bottomView }}>
              <View style={{ ...styles.bottomInfoView }}>
                <Text style={{ ...styles.bottomInfoLabel }}>
                  Restante a Pagar
                </Text>
                <Text style={{ ...styles.bottomInfoText }}>
                  <Text style={{ fontSize: 16 }}>R$ </Text>
                  {monetaryNumberToString(allData.loans[data.id].remainToPay)}
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
      ) : null}
    </>
  );
};

export default LoanCard;

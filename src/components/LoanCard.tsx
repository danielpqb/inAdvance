import { gSC, gStyles } from "@/styles/global";
import { FC, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { router } from "expo-router";
import { TLoan } from "@/types/Loan";
import { useQuery } from "@tanstack/react-query";
import { useDatabaseContext } from "@/contexts/DatabaseContext";
import { useNavigationContext } from "@/contexts/NavigationContext";

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
  selectedCard: {
    borderWidth: 5,
    borderColor: gSC("red800"),
    backgroundColor: gSC("white", 0.15),
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
  const { changeNavigationMode, setSelectedLoan } = useNavigationContext();
  const [isSelected, setIsSelected] = useState(false);

  const { services } = useDatabaseContext();

  const {
    data: allData,
    status: allDataStatus,
    error,
  } = useQuery({
    queryKey: ["allData"],
    queryFn: services.all.allData,
  });

  if (allDataStatus === "pending") {
    return <Text style={{ ...styles.text }}>Carregando...</Text>;
  }

  if (allDataStatus === "error") {
    return (
      <Text style={{ ...styles.text, color: gSC("red600") }}>
        {error?.message}
      </Text>
    );
  }

  if (allDataStatus === "success") {
    return (
      <Button
        style={{ ...styles.button }}
        onLongPress={() => {
          changeNavigationMode("delete");
          setIsSelected(!isSelected);
        }}
        onPress={() => {
          setSelectedLoan(data);
          router.push(`/loans/${data.id}`);
        }}
      >
        <View
          style={{
            ...styles.view,
            ...(isSelected ? { ...styles.selectedCard } : {}),
          }}
        >
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
                {monetaryNumberToString(
                  Math.ceil(allData.loans[data.id]?.remainToPay) || 0
                )}
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
  }
};

export default LoanCard;

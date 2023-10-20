import { TGlobalColors, gSC, gStyles } from "@/styles/global";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TInstallment } from "@/types/Installment";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    backgroundColor: gSC("white", 0.1),
    padding: 15,
    flex: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: gSC("zinc300", 0.2),
    gap: 15,
    width: "100%",
  },
  button: {
    backgroundColor: undefined,
    padding: undefined,
    borderWidth: 0,
    width: "100%",
  },
  rowContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: gSC("zinc100", 0.5),
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: gSC("zinc100"),
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
});

type TInstallmentCardProps = {
  data: TInstallment;
};
const InstallmentCard: FC<TInstallmentCardProps> = ({ data }) => {
  let statusIconData: { color: TGlobalColors; name: string };
  switch (data.status) {
    case "Aguardando":
      statusIconData = { color: "zinc400", name: "remove-circle" };
      break;
    case "Atrasado":
      statusIconData = { color: "red800", name: "close-circle" };
      break;
    case "Pago":
      statusIconData = { color: "emerald600", name: "checkmark-circle" };
      break;
    default:
      statusIconData = { color: "zinc400", name: "checkmark-circle" };
      break;
  }

  return (
    <View style={{ ...styles.view }}>
      <View style={{ ...styles.rowContainer }}>
        <View>
          <Text style={{ ...styles.label }}>N° da Parcela</Text>
          <Text style={{ ...styles.text, fontSize: 20 }}>
            <Text
              style={{
                fontSize: 24,
                color: gSC("yellow300"),
                fontWeight: "700",
              }}
            >
              {data.number}
            </Text>
            {` / ${data.installments}`}
          </Text>
        </View>
        <View>
          <Text style={{ ...styles.label, textAlign: "right" }}>
            Vencimento
          </Text>
          <Text style={{ ...styles.text, textAlign: "right" }}>
            {data.date}
          </Text>
        </View>
      </View>
      <View style={{ ...styles.rowContainer }}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...styles.label }}>Status</Text>
          <View style={{ ...styles.statusView }}>
            <Text
              style={{
                ...styles.text,
                fontSize: 20,
                color: gSC(statusIconData.color),
              }}
            >
              {data.status}
            </Text>
            <Ionicons
              name={statusIconData.name as any}
              size={22}
              color={gSC(statusIconData.color)}
              style={{ marginTop: 3 }}
            />
          </View>
        </View>
        <View>
          <Text style={{ ...styles.label, textAlign: "right" }}>
            Valor da Parcela
          </Text>
          <Text
            style={{
              ...styles.text,
              textAlign: "right",
              color: gSC("yellow300"),
            }}
          >
            {`R$ `}
            <Text style={{ fontSize: 24 }}>
              {monetaryNumberToString(Math.ceil(data.value))}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InstallmentCard;

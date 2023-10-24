import { StyleSheet, View, Text } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import { useLocalSearchParams } from "expo-router";
import ScrollContainer from "@/components/ScrollContainer";
import InstallmentCard from "@/components/InstallmentCard";
import { useQuery } from "@tanstack/react-query";
import { convertDateStringFormat } from "@/utils/date-converter";
import { useDatabaseContext } from "@/contexts/DatabaseContext";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    gap: 20,
    padding: 15,
    justifyContent: "flex-start",
  },
  input: {},
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

type TInstallmentsScreenProps = {};
const InstallmentsScreen: FC<TInstallmentsScreenProps> = () => {
  const { services } = useDatabaseContext();
  const {
    data: installmentsData,
    status,
    error,
  } = useQuery({
    queryKey: ["installments"],
    queryFn: services.installments.findAll,
  });

  const { id: loanId } = useLocalSearchParams();

  if (status === "pending") {
    return <Text style={{ ...styles.text }}>Carregando...</Text>;
  }

  if (status === "error") {
    return (
      <Text style={{ ...styles.text, color: gSC("red600") }}>
        {error?.message}
      </Text>
    );
  }

  if (status === "success" && installmentsData.length > 0) {
    return (
      <ScrollContainer style={{ paddingBottom: 0, paddingTop: 0 }}>
        <View style={{ ...styles.view }}>
          {installmentsData
            .filter((installment) => installment.loanId === Number(loanId))
            .map((data, idx) => {
              return (
                <InstallmentCard
                  key={idx}
                  data={{
                    id: data.id,
                    date: data.date,
                    installments: data.maxInstallments,
                    number: data.number,
                    status: data.isPaid
                      ? "Pago"
                      : new Date(
                          convertDateStringFormat(
                            data.date,
                            "DD/MM/YYYY",
                            "YYYY/MM/DD"
                          )
                        ) < new Date()
                      ? "Atrasado"
                      : "Aguardando",
                    value: data.value,
                  }}
                />
              );
            })}
        </View>
      </ScrollContainer>
    );
  }

  return <Text style={{ ...styles.text }}>Não há parcelas registradas...</Text>;
};

export default InstallmentsScreen;

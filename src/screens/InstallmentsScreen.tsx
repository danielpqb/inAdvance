import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import { useLocalSearchParams } from "expo-router";
import ScrollContainer from "@/components/ScrollContainer";
import { TInstallment } from "@/types/Installment";
import InstallmentCard from "@/components/InstallmentCard";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    gap: 20,
    padding: 15,
    justifyContent: "flex-start",
  },
  input: {},
  button: {
    backgroundColor: gSC("emerald600"),
    width: "100%",
    height: 50,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
});

const segmentsData: TInstallment[] = [
  {
    id: 1,
    number: 1,
    installments: 12,
    date: "12/10/2023",
    status: "Pago",
    value: 16100,
  },
  {
    id: 2,
    number: 2,
    installments: 12,
    date: "12/10/2023",
    status: "Pago",
    value: 16100,
  },
  {
    id: 3,
    number: 3,
    installments: 12,
    date: "12/10/2023",
    status: "Pago",
    value: 16100,
  },
  {
    id: 4,
    number: 4,
    installments: 12,
    date: "12/10/2023",
    status: "Pago",
    value: 16100,
  },
  {
    id: 5,
    number: 5,
    installments: 12,
    date: "12/10/2023",
    status: "Pago",
    value: 16100,
  },
  {
    id: 6,
    number: 6,
    installments: 12,
    date: "12/10/2023",
    status: "Atrasado",
    value: 16100,
  },
  {
    id: 7,
    number: 7,
    installments: 12,
    date: "12/10/2023",
    status: "Aguardando",
    value: 16100,
  },
  {
    id: 8,
    number: 8,
    installments: 12,
    date: "12/10/2023",
    status: "Aguardando",
    value: 16100,
  },
];

type TInstallmentsScreenProps = {};
const InstallmentsScreen: FC<TInstallmentsScreenProps> = () => {
  const { id } = useLocalSearchParams();

  return (
    <ScrollContainer style={{ paddingBottom: 0, paddingTop: 0 }}>
      <View style={{ ...styles.view }}>
        {segmentsData.map((data, idx) => {
          return (
            <InstallmentCard
              key={idx}
              data={data}
            />
          );
        })}
      </View>
    </ScrollContainer>
  );
};

export default InstallmentsScreen;

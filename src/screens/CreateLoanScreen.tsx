import { StyleSheet, View } from "react-native";
import { FC, useState } from "react";
import { gSC, gStyles } from "@/styles/global";
import Button from "@/components/Button";
import Input from "@/components/Input";
import loanDB from "@/services/sqlite/Loans";
import { router } from "expo-router";

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

type TCreateLoanScreenProps = {};
const CreateLoanScreen: FC<TCreateLoanScreenProps> = () => {
  const [inputValues, setInputValues] = useState({
    customerName: "",
    description: "",
    total: "",
    maxInstallments: "",
  });

  return (
    <View style={{ ...styles.view }}>
      <Input
        label="Cliente"
        inputStyle={{ ...styles.input }}
        inputProps={{
          placeholder: "Digite para pesquisar...",
          value: inputValues.customerName,
          onChangeText: (text) => {
            setInputValues((old) => ({ ...old, customerName: text }));
          },
        }}
      />
      <Input
        label="Descrição"
        inputStyle={{ ...styles.input }}
        inputProps={{
          value: inputValues.description,
          onChangeText: (text) => {
            setInputValues((old) => ({ ...old, description: text }));
          },
        }}
      />
      <Input
        label="Valor Total"
        inputStyle={{ ...styles.input }}
        inputProps={{
          keyboardType: "number-pad",
          value: inputValues.total,
          onChangeText: (text) => {
            setInputValues((old) => ({ ...old, total: text }));
          },
        }}
      />
      <Input
        label="Número de Parcelas"
        inputStyle={{ ...styles.input }}
        inputProps={{
          keyboardType: "number-pad",
          value: inputValues.maxInstallments,
          onChangeText: (text) => {
            setInputValues((old) => ({ ...old, maxInstallments: text }));
          },
        }}
      />
      <Button
        style={{ ...styles.button }}
        onLongPress={() => {}}
        onPress={async () => {
          await loanDB.create({
            customerName: inputValues.customerName,
            description: inputValues.description,
            total: Number(inputValues.total),
            maxInstallments: Number(inputValues.maxInstallments),
          });
          router.back()
        }}
      >
        ADICIONAR
      </Button>
    </View>
  );
};

export default CreateLoanScreen;

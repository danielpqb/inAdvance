import { StyleSheet, View } from "react-native";
import { FC, useState } from "react";
import { gSC, gStyles } from "@/styles/global";
import Button from "@/components/Button";
import Input from "@/components/Input";
import customerDB from "@/services/sqlite/Customers";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

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

type TCreateCustomerScreenProps = {};
const CreateCustomerScreen: FC<TCreateCustomerScreenProps> = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const createCustomer = useMutation({
    mutationFn: customerDB.createOrFail,
    mutationKey: ["createCustomer"],
  });

  return (
    <View style={{ ...styles.view }}>
      <Input
        label="Nome"
        errorMessage={inputErrorMsg}
        inputStyle={{ ...styles.input }}
        inputProps={{
          multiline:false,
          maxLength: 80,
          value: inputValue,
          onChangeText: (text) => {
            setInputValue(text);
          },
        }}
      />
      <Button
        style={{ ...styles.button }}
        onLongPress={() => {}}
        onPress={async () => {
          try {
            await createCustomer.mutateAsync({ name: inputValue });
            router.back();
          } catch (error) {
            setInputErrorMsg(error as string)
          }
        }}
      >
        ADICIONAR
      </Button>
    </View>
  );
};

export default CreateCustomerScreen;

import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import Button from "@/components/Button";
import Input from "@/components/Input";

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
  return (
    <View style={{ ...styles.view }}>
      <Input
        label="Nome"
        inputStyle={{ ...styles.input }}
      />
      <Button
        style={{ ...styles.button }}
        onLongPress={() => {}}
        onPress={() => {
          console.warn("Hello! I'm a Button.");
        }}
      >
        ADICIONAR
      </Button>
    </View>
  );
};

export default CreateCustomerScreen;

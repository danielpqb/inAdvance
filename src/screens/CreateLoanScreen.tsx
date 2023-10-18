import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  LayoutRectangle,
} from "react-native";
import { FC, useState } from "react";
import { gSC, gStyles } from "@/styles/global";
import Button from "@/components/Button";
import Input from "@/components/Input";
import loanDB from "@/services/sqlite/Loans";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import customerDB from "@/services/sqlite/Customers";
import { TCustomer } from "@/types/Customer";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  view: {
    ...gStyles.growCenter,
    gap: 20,
    padding: 15,
    justifyContent: "flex-start",
  },
  input: {},
  inputSearchContainer: {
    width: "100%",
    position: "absolute",
    backgroundColor: gSC("neutral900"),
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: gSC("emerald600"),
    gap: 1,
    alignSelf: "center",
  },
  inputSearchText: { color: gSC("zinc100"), textAlign: "center" },
  inputSearchButton: {
    backgroundColor: gSC("zinc100", 0.1),
    borderRadius: 0,
  },
  inputSearchButtonPressed: {
    backgroundColor: gSC("emerald600"),
    transform: undefined,
    opacity: undefined,
  },
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
  const [searchedCustomers, setSearchedCustomers] = useState(
    [] as Partial<TCustomer>[]
  );
  const [inputValues, setInputValues] = useState({
    customerName: "",
    description: "",
    total: "",
    maxInstallments: "",
  });
  const { data: customersData } = useQuery({
    queryKey: ["customers"],
    queryFn: customerDB.findAll,
  });

  const [customerNameInputDimensions, setCustomerNameInputDimensions] =
    useState({} as LayoutRectangle);
  const [customerInputOnFocus, setCustomerInputOnFocus] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(
    null as Partial<TCustomer> | null
  );

  return (
    <>
      <ScrollView>
        <View
          style={{ ...styles.view }}
          onTouchStart={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{ width: "100%", zIndex: 1 }}
            onLayout={(e) => {
              setCustomerNameInputDimensions(e.nativeEvent.layout);
            }}
          >
            <Input
              label="Cliente"
              inputStyle={{ ...styles.input }}
              inputProps={{
                placeholder: "Digite para pesquisar...",
                value: inputValues.customerName,
                onChangeText: (text) => {
                  setInputValues((old) => ({ ...old, customerName: text }));
                  setSearchedCustomers(
                    customersData
                      ? customersData.filter((customer) => {
                          if (!text) return false;
                          return customer.name
                            .toUpperCase()
                            .includes(text.toUpperCase());
                        })
                      : []
                  );
                },
                onFocus: () => {
                  const text = selectedCustomer?.name ?? "";
                  setSearchedCustomers(
                    customersData
                      ? customersData.filter((customer) => {
                          if (!text) return false;
                          return customer.name
                            .toUpperCase()
                            .includes(text.toUpperCase());
                        })
                      : []
                  );
                  setCustomerInputOnFocus(true);
                },
                onBlur: () => {
                  setCustomerInputOnFocus(false);
                },
              }}
            />
          </View>
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
              if (
                selectedCustomer?.name &&
                inputValues.description &&
                Number(inputValues.total) &&
                Number(inputValues.maxInstallments)
              ) {
                await loanDB.create({
                  customerName: selectedCustomer.name,
                  description: inputValues.description,
                  total: Number(inputValues.total),
                  maxInstallments: Number(inputValues.maxInstallments),
                });
                router.back();
              }
            }}
          >
            ADICIONAR
          </Button>
        </View>
      </ScrollView>
      {searchedCustomers.length > 0 && customerInputOnFocus ? (
        <View
          style={{
            ...styles.inputSearchContainer,
            top:
              customerNameInputDimensions.height +
              customerNameInputDimensions.y,
            width: customerNameInputDimensions.width,
          }}
        >
          {searchedCustomers.map((customer, idx) => {
            return (
              <Button
                key={idx}
                style={{
                  ...styles.inputSearchButton,
                }}
                pressedStyle={{ ...styles.inputSearchButtonPressed }}
                onPress={() => {
                  setSelectedCustomer(customer);
                  setInputValues((old) => ({
                    ...old,
                    customerName: customer?.name ? customer.name : "",
                  }));
                  Keyboard.dismiss();
                }}
              >
                <Text style={{ ...styles.inputSearchText }}>
                  {customer.name}
                </Text>
              </Button>
            );
          })}
        </View>
      ) : null}
    </>
  );
};

export default CreateLoanScreen;

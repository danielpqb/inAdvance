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
import { useMutation, useQuery } from "@tanstack/react-query";
import customerDB from "@/services/sqlite/Customers";
import { TCustomer } from "@/types/Customer";
import { ScrollView } from "react-native-gesture-handler";
import CurrencyInput from "react-native-currency-input";

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
  const [inputErrorMsg, setInputErrorMsg] = useState({
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

  function filterCustomers({
    maxSize,
    searchText,
  }: {
    maxSize: number;
    searchText: string;
  }) {
    if (customersData) {
      const filtered = [];
      for (let i = 0; i < customersData.length; i++) {
        const customer = customersData[i];
        const isMatch = customer.name
          .toUpperCase()
          .includes(searchText.toUpperCase());
        if (isMatch) filtered.push(customer);
        if (filtered.length >= maxSize) return filtered;
      }
      return filtered;
    }
    return [];
  }

  const createLoan = useMutation({
    mutationKey: ["createLoan"],
    mutationFn: loanDB.createOrFail,
  });

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
              errorMessage={inputErrorMsg.customerName}
              inputStyle={{ ...styles.input }}
              inputProps={{
                multiline: false,
                maxLength: 80,
                placeholder: "Digite para pesquisar...",
                value: inputValues.customerName,
                onChangeText: (text) => {
                  setInputValues((old) => ({ ...old, customerName: text }));
                  setSearchedCustomers(
                    filterCustomers({ maxSize: 4, searchText: text })
                  );
                },
                onFocus: () => {
                  setSelectedCustomer(null);
                  const text = inputValues.customerName;
                  setSearchedCustomers(
                    filterCustomers({ maxSize: 4, searchText: text })
                  );
                  setCustomerInputOnFocus(true);
                },
                onBlur: () => {
                  setCustomerInputOnFocus(false);
                  if (!selectedCustomer?.id) {
                    setInputValues((old) => ({ ...old, customerName: "" }));
                    setInputErrorMsg((old) => ({
                      ...old,
                      customerName: "Selecione um Cliente.",
                    }));
                  }
                },
              }}
            />
          </View>
          <Input
            label="Descrição"
            errorMessage={inputErrorMsg.description}
            inputStyle={{ ...styles.input }}
            inputProps={{
              maxLength: 80,
              multiline: false,
              value: inputValues.description,
              onChangeText: (text) => {
                setInputValues((old) => ({ ...old, description: text }));
              },
            }}
          />
          <CurrencyInput
            value={Number(inputValues.total) || null}
            onChangeValue={(val) =>
              setInputValues((old) => {
                return { ...old, total: val ? val.toString() : "" };
              })
            }
            style={{ ...styles.input }}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            maxLength={15}
            placeholder="R$ 0,00"
            keyboardType="number-pad"
            renderTextInput={(textInputProps) => (
              <Input
                label="Valor Total"
                errorMessage={inputErrorMsg.total}
                inputProps={{
                  ...textInputProps,
                }}
              />
            )}
          />
          <Input
            label="Número de Parcelas"
            errorMessage={inputErrorMsg.maxInstallments}
            inputStyle={{ ...styles.input }}
            inputProps={{
              maxLength: 2,
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
              setInputErrorMsg({
                customerName: "",
                description: "",
                maxInstallments: "",
                total: "",
              });
              if (
                selectedCustomer?.id &&
                inputValues.description &&
                Number(inputValues.total) &&
                Number(inputValues.maxInstallments)
              ) {
                await createLoan.mutateAsync({
                  customerId: selectedCustomer.id,
                  description: inputValues.description,
                  total: Number(inputValues.total),
                  maxInstallments: Number(inputValues.maxInstallments),
                });
                router.back();
              }
              if (!selectedCustomer?.id)
                setInputErrorMsg((old) => ({
                  ...old,
                  customerName: "Selecione um Cliente.",
                }));
              if (!inputValues.description)
                setInputErrorMsg((old) => {
                  old["description"] = "Preencha a descrição.";
                  return old;
                });
              if (!Number(inputValues.total))
                setInputErrorMsg((old) => {
                  old["total"] = "Valor total deve ser maior que zero.";
                  return old;
                });
              if (!Number(inputValues.maxInstallments))
                setInputErrorMsg((old) => {
                  old["maxInstallments"] =
                    "Nº de Parcelas deve ser maior que zero.";
                  return old;
                });
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
                  setInputErrorMsg((old) => ({ ...old, customerName: "" }));
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

import { StyleSheet, View, Keyboard } from "react-native";
import { FC, useState } from "react";
import { gSC, gStyles } from "@/styles/global";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useDatabaseContext } from "@/contexts/DatabaseContext";

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

type TCreateDBScreenProps = {};
const CreateDBScreen: FC<TCreateDBScreenProps> = () => {
  const { openDB } = useDatabaseContext();
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const [inputErrorMsg, setInputErrorMsg] = useState({
    name: "",
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
          <Input
            label="Nome"
            errorMessage={inputErrorMsg.name}
            inputStyle={{ ...styles.input }}
            inputProps={{
              maxLength: 80,
              multiline: false,
              value: inputValues.name,
              onChangeText: (text) => {
                setInputValues((old) => ({ ...old, name: text }));
              },
            }}
          />
          <Button
            style={{ ...styles.button }}
            onLongPress={() => {}}
            onPress={async () => {
              setInputErrorMsg({
                name: "",
              });
              if (inputValues.name) {
                openDB(inputValues.name);
                router.back();
              }
              if (!inputValues.name)
                setInputErrorMsg((old) => {
                  old["name"] = "Preencha o nome.";
                  return old;
                });
            }}
          >
            ADICIONAR
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateDBScreen;

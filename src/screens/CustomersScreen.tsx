import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { gSC, gStyles } from "@/styles/global";
import Button from "@/components/Button";
import { useAppContext } from "@/contexts/AppContext";

const styles = StyleSheet.create({
  view: { ...gStyles.growCenter },
  text: {
    color: gSC("zinc200"),
    fontSize: 50,
    paddingBottom: 20,
  },
});

type TCustomersScreenProps = {};
const CustomersScreen: FC<TCustomersScreenProps> = () => {
  const { changeNavigationMode } = useAppContext();
  return (
    <View style={{ ...styles.view, gap: 15 }}>
      <Text style={{ ...styles.text }}>Customers</Text>
      <Button
        onLongPress={() => {
          changeNavigationMode("delete");
        }}
        onPress={async () => {
          console.warn("Hello! I'm a Button.");
        }}
      ></Button>
    </View>
  );
};

export default CustomersScreen;

import { gSC, gStyles } from "@/styles/global";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  view: { ...gStyles.growCenter },
  text: {
    color: gSC("orange600"),
    fontSize: 36,
  },
});

type TLoansScreenProps = {};
const LoansScreen: FC<TLoansScreenProps> = () => {
  return (
    <View style={{ ...styles.view }}>
      <Text style={{ ...styles.text }}>Loans!</Text>
    </View>
  );
};

export default LoansScreen;

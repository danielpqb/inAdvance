import { View, StyleSheet, Dimensions, Text } from "react-native";
import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/routers";
import { RouteProp } from "@react-navigation/native";
import { Layout } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { gSC } from "@/styles/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAppContext } from "@/contexts/AppContext";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: gSC("neutral900"),
    position: "absolute",
    top: windowHeight - 70,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: gSC("zinc100"),
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    width: "auto",
  },
});

type FooterProps = {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
  route: RouteProp<ParamListBase>;
  layout: Layout;
  options: DrawerNavigationOptions;
};
const Footer: React.FC<FooterProps> = ({
  navigation,
  layout,
  options,
  route,
}) => {
  const { top } = useSafeAreaInsets();
  const { footerStates } = useAppContext();

  return (
    <>
      {footerStates.showFooter ? (
        <View style={{ ...styles.container, top: styles.container.top + top }}>
          <Button
            onPress={() => {
              router.push("/customers");
            }}
            style={{
              ...styles.button,
            }}
          >
            <Ionicons
              name={"person-circle-outline"}
              size={35}
              color={
                options.title === "Clientes"
                  ? gSC("emerald600")
                  : gSC("zinc100")
              }
            />
            <Text
              style={{
                ...styles.text,
                ...(options.title === "Clientes" && {
                  color: gSC("emerald600"),
                }),
              }}
            >
              Clientes
            </Text>
          </Button>
          <Button
            onPress={() => {
              router.push("/loans");
            }}
            style={{ ...styles.button }}
          >
            <Ionicons
              name={"card-outline"}
              size={35}
              color={
                options.title === "Empréstimos"
                  ? gSC("emerald600")
                  : gSC("zinc100")
              }
            />
            <Text
              style={{
                ...styles.text,
                ...(options.title === "Empréstimos" && {
                  color: gSC("emerald600"),
                }),
              }}
            >
              Empréstimos
            </Text>
          </Button>
        </View>
      ) : null}
    </>
  );
};

export default Footer;

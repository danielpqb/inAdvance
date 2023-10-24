import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { gSC } from "@/styles/global";
import { router } from "expo-router";
import { useNavigationContext } from "@/contexts/NavigationContext";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: gSC("neutral900"),
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

type FooterProps = {};
const Footer: React.FC<FooterProps> = () => {
  const { footerStates, headerStates } = useNavigationContext();

  const iconsStyles = {
    dbs: {
      icon:
        headerStates.title === "Bancos de Dados" ? "layers" : "layers-outline",
      color:
        headerStates.title === "Bancos de Dados"
          ? gSC("emerald600")
          : gSC("zinc100"),
    },
    customers: {
      icon: headerStates.title === "Clientes" ? "people" : "people-outline",
      color:
        headerStates.title === "Clientes" ? gSC("emerald600") : gSC("zinc100"),
    },
    loans: {
      icon: headerStates.title === "Empréstimos" ? "card" : "card-outline",
      color:
        headerStates.title === "Empréstimos"
          ? gSC("emerald600")
          : gSC("zinc100"),
    },
  };

  return (
    <>
      {footerStates.showFooter ? (
        <View style={{ ...styles.container }}>
          <Button
            onPress={() => {
              router.push("/dbs");
            }}
            style={{
              ...styles.button,
            }}
          >
            <Ionicons
              name={iconsStyles.dbs.icon as any}
              size={35}
              color={iconsStyles.dbs.color}
            />
            <Text
              style={{
                ...styles.text,
                color: iconsStyles.dbs.color,
              }}
            >
              BDs
            </Text>
          </Button>
          <Button
            onPress={() => {
              router.push("/customers");
            }}
            style={{
              ...styles.button,
            }}
          >
            <Ionicons
              name={iconsStyles.customers.icon as any}
              size={35}
              color={iconsStyles.customers.color}
            />
            <Text
              style={{
                ...styles.text,
                color: iconsStyles.customers.color,
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
              name={iconsStyles.loans.icon as any}
              size={35}
              color={iconsStyles.loans.color}
            />
            <Text
              style={{
                ...styles.text,
                color: iconsStyles.loans.color,
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

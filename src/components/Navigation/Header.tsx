import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/routers";
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Layout } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { gSC } from "@/styles/global";
import { router, usePathname } from "expo-router";
import { useAppContext } from "@/contexts/AppContext";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: gSC("neutral900"),
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: gSC("zinc100"),
    width: "100%",
    textAlign: "center",
    position: "absolute",
  },
  addButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    position: "absolute",
    zIndex: 1,
    right: 10,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    position: "absolute",
    zIndex: 1,
    right: 15,
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    position: "absolute",
    zIndex: 1,
    left: 10,
  },
});

type HeaderProps = {
  navigation:
    | DrawerNavigationProp<ParamListBase, string, undefined>
    | BottomTabNavigationProp<ParamListBase, string, undefined>;
  route: RouteProp<ParamListBase>;
  layout: Layout;
  options: DrawerNavigationOptions | BottomTabNavigationOptions;
};
const Header: React.FC<HeaderProps> = ({
  navigation,
  layout,
  options,
  route,
}) => {
  const { headerStates, navigationStates, changeNavigationMode } =
    useAppContext();
  const path = usePathname();
  return (
    <>
      <SafeAreaView style={{ backgroundColor: gSC("neutral900") }} />
      <View style={{ ...styles.container }}>
        {headerStates?.showBackButton ? (
          <Button
            onPress={() => {
              if (navigationStates.mode === "delete") {
                changeNavigationMode("default");
                return;
              }
              router.back();
            }}
            style={{ ...styles.backButton }}
          >
            <Ionicons
              name={"arrow-back"}
              size={35}
              color={gSC("zinc100")}
            />
          </Button>
        ) : null}
        <Text style={{ ...styles.text }}>{headerStates.title}</Text>
        {headerStates?.showAddButton ? (
          <Button
            onPress={() => {
              router.push(`${path}/create`);
            }}
            style={{ ...styles.addButton }}
          >
            <Ionicons
              name={"add"}
              size={40}
              color={gSC("emerald600")}
            />
          </Button>
        ) : null}
        {headerStates?.showDeleteButton ? (
          <Button
            onPress={() => {}}
            style={{ ...styles.deleteButton }}
          >
            <Ionicons
              name={"trash"}
              size={30}
              color={gSC("red600")}
            />
          </Button>
        ) : null}
      </View>
    </>
  );
};

export default Header;

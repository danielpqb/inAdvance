import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { gSC } from "@/styles/global";
import { router, usePathname } from "expo-router";
import { useNavigationContext } from "@/contexts/NavigationContext";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: gSC("neutral900"),
  },
  subHeader: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: gSC("neutral900"),
    gap: 5,
  },
  subHeaderName: {
    color: gSC("emerald600"),
    textAlign: "center",
  },
  subHeaderDescription: {
    color: gSC("zinc100"),
    textAlign: "center",
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

type HeaderProps = {};
const Header: React.FC<HeaderProps> = () => {
  const { headerStates, navigationStates, changeNavigationMode, actions } =
    useNavigationContext();
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
            onPress={() => {
              actions.deleteFn();
              changeNavigationMode("default");
            }}
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
      {headerStates.showSubHeader ? (
        <View style={{ ...styles.subHeader }}>
          {headerStates.subHeaderName ? (
            <Text style={{ ...styles.subHeaderName }}>
              {headerStates.subHeaderName}
            </Text>
          ) : null}
          {headerStates.subHeaderDescription ? (
            <Text style={{ ...styles.subHeaderDescription }}>
              {headerStates.subHeaderDescription}
            </Text>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default Header;

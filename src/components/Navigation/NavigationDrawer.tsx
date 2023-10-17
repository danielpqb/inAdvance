import { createDrawerNavigator } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import Header from "./Header";
import Footer from "./Footer";
const { Navigator } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

type NavigationDrawerProps = {};
const NavigationDrawer: React.FC<NavigationDrawerProps> = () => {
  return (
    <>
      <Drawer
        detachInactiveScreens
        screenOptions={() => ({
          sceneContainerStyle: { backgroundColor: "transparent" },
          header: ({ navigation, route, layout, options }) => (
            <>
              <Header
                navigation={navigation}
                route={route}
                layout={layout}
                options={options}
              />
              <Footer
                navigation={navigation}
                route={route}
                layout={layout}
                options={options}
              />
            </>
          ),
        })}
      >
        <Drawer.Screen
          name="customers"
          options={{
            drawerLabel: "Clientes",
            title: "Clientes",
          }}
        />
        <Drawer.Screen
          name="loans"
          options={{
            drawerLabel: "Empréstimos",
            title: "Empréstimos",
          }}
        />
      </Drawer>
    </>
  );
};

export default NavigationDrawer;

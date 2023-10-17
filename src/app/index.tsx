import { FC } from "react";
import CustomersScreen from "@/screens/CustomersScreen";
import { Redirect } from "expo-router";

type TIndexProps = {};
const Index: FC<TIndexProps> = () => {
  return <Redirect href={"/customers"} />;
};

export default Index;

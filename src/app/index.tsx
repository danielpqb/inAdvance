import { FC } from "react";
import { Redirect } from "expo-router";

type TIndexProps = {};
const Index: FC<TIndexProps> = () => {
  return <Redirect href={"/dbs"} />;
};

export default Index;

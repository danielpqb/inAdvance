import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { gSC } from "@/styles/global";
import ScrollContainer from "@/components/ScrollContainer";
import Button from "@/components/Button";
import { useDatabaseContext } from "@/contexts/DatabaseContext";
import arrayMapping from "@/utils/array-mapping";

const styles = StyleSheet.create({
  view: {
    gap: 8,
    padding: 15,
  },
  button: {
    color: gSC("zinc100"),
    backgroundColor: gSC("emerald900"),
    textAlign: "center",
    height: 80,
    fontSize: 20,
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    gap: 8,
  },
});

type TDatabasesScreenProps = {};
const DatabasesScreen: FC<TDatabasesScreenProps> = () => {
  const { openDB, dbs, deleteDB } = useDatabaseContext();

  return (
    <ScrollContainer style={{ paddingBottom: 70, paddingTop: 0 }}>
      <View style={{ ...styles.view }}>
        {arrayMapping
          .mapToGrid(
            dbs.filter((db) => !db.includes("journal")),
            2
          )
          .map((row, idx) => {
            return (
              <View
                key={idx}
                style={{ ...styles.grid }}
              >
                {row.map((db, idx2) => {
                  return (
                    <Button
                      style={{ ...styles.button }}
                      key={idx2}
                      onPress={() => {
                        openDB(db);
                      }}
                    >
                      {db}
                    </Button>
                  );
                })}
              </View>
            );
          })}
        {arrayMapping
          .mapToGrid(
            dbs.filter((db) => !db.includes("journal")),
            2
          )
          .map((row, idx) => {
            return (
              <View
                key={idx}
                style={{ ...styles.grid }}
              >
                {row.map((db, idx2) => {
                  return (
                    <Button
                      style={{
                        ...styles.button,
                        backgroundColor: gSC("red800"),
                      }}
                      key={idx2}
                      onPress={() => {
                        deleteDB(db);
                      }}
                    >
                      {db}
                    </Button>
                  );
                })}
              </View>
            );
          })}
      </View>
    </ScrollContainer>
  );
};

export default DatabasesScreen;

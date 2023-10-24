import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { gSC } from "@/styles/global";
import ScrollContainer from "@/components/ScrollContainer";
import Button from "@/components/Button";
import { useDatabaseContext } from "@/contexts/DatabaseContext";
import arrayMapping from "@/utils/array-mapping";
import { useNavigationContext } from "@/contexts/NavigationContext";

const styles = StyleSheet.create({
  view: {
    gap: 8,
    padding: 15,
  },
  button: {
    color: gSC("zinc100"),
    backgroundColor: gSC("white", 0.1),
    textAlign: "center",
    height: 80,
    fontSize: 20,
    flex: 1,
  },
  selectedButton: {
    borderWidth: 5,
    borderColor: gSC("emerald600"),
    backgroundColor: gSC("emerald950"),
  },
  selectedToDeleteButton: {
    borderColor: gSC("red600"),
    backgroundColor: gSC("red950"),
  },
  grid: {
    flexDirection: "row",
    gap: 8,
  },
});

type TDatabasesScreenProps = {};
const DatabasesScreen: FC<TDatabasesScreenProps> = () => {
  const { openDB, dbs, selectedDB } = useDatabaseContext();
  const { changeNavigationMode, navigationStates } = useNavigationContext();

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
                      style={{
                        ...styles.button,
                        ...(selectedDB === db ? styles.selectedButton : {}),
                        ...(selectedDB === db &&
                        navigationStates.mode === "delete"
                          ? styles.selectedToDeleteButton
                          : {}),
                      }}
                      key={idx2}
                      onPress={() => {
                        openDB(db);
                      }}
                      onLongPress={async () => {
                        await openDB(db);
                        changeNavigationMode("delete");
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

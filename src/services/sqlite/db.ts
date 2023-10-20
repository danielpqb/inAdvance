import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appDB");
// db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
//   console.log("Foreign keys turned on")
// );

export default db;

// async function openDatabase(
//   pathToDatabaseFile: string
// ): Promise<SQLite.SQLiteDatabase> {
//   if (
//     !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
//       .exists
//   ) {
//     await FileSystem.makeDirectoryAsync(
//       FileSystem.documentDirectory + "SQLite"
//     );
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + "SQLite/myDatabaseName.db"
//   );
//   return SQLite.openDatabase("myDatabaseName.db");
// }

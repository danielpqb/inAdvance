import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appDB");

export default db;
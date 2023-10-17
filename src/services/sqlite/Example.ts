import db from "./db";

type TExample = {
  id: number;
  name: string;
  description: string;
  age: number;
};

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre que app é iniciado. (Somente se outro arquivo chamar esse arquivo)
 */
db.transaction((tx) => {
  // tx.executeSql("DROP TABLE examples;");
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS examples (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, age INT);"
  );
});

/**
 * @returns Object created
 */
async function create(obj: Omit<TExample, "id">) {
  let id = 0;
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "INSERT INTO examples (name, description, age) values (?, ?, ?);",
        [obj.name, obj.description, obj.age]
      );
      id = res.insertId ?? 0;
      if (!id) {
        throw "Failed to create new register.";
      }
    });
    return { ...obj, id: id } as TExample;
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @returns Object found
 */
async function find(id: number) {
  let obj = {};
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("SELECT * FROM examples WHERE id=?;", [
        id,
      ]);
      obj = res.rows[0];
      if (!obj) {
        throw "Failed to find register.";
      }
    });
    return obj as TExample;
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @returns Array of objects found
 */
async function findAll() {
  let all: any[] = [];
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("SELECT * FROM examples;", []);
      all = res.rows;
      if (!all.length) {
        throw "Failed to find any data.";
      }
    });
    return all as TExample[];
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @returns Updated object
 */
async function update(id: number, obj: Omit<TExample, "id">) {
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync(
        "UPDATE examples SET name=?, description=?, age=? WHERE id=?;",
        [obj.name, obj.description, obj.age, id]
      );
      if (res.rowsAffected < 1) {
        throw "Failed to update register.";
      }
    });
    return { ...obj, id: id } as TExample;
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @returns Number of rows deleted
 */
async function remove(id: number) {
  let affected = 0;
  try {
    await db.transactionAsync(async (tx) => {
      const res = await tx.executeSqlAsync("DELETE FROM examples WHERE id=?;", [
        id,
      ]);
      affected = res.rowsAffected;
      if (affected < 1) {
        throw "Failed to delete register.";
      }
    });
    return affected;
  } catch (error) {
    console.error(error);
    return;
  }
}

const exampleDB = {
  create,
  update,
  find,
  findAll,
  remove,
};

export default exampleDB;

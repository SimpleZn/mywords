// 这段代码使用 TypeScript 编写了一个与 IndexedDB 的交互示例。
// 定义了数据库接口 MyDB 和存储接口 MyStore。
// 打开数据库并进行版本更新，如果对象存储 myStore 不存在，则创建它并添加索引。
// 数据库打开成功后，调用 addData 函数添加数据到数据库中。
// 数据添加和事务完成时打印成功和错误信息。

interface MyDB {
  readonly name: string;
  readonly version: number;
  transaction: (
    storeNames: string[],
    mode?: "readonly" | "readwrite" | "versionchange"
  ) => IDBTransaction;
  objectStore: (
    name: string,
    optionalParameters?: IDBObjectStoreParameters
  ) => IDBObjectStore;
}

interface MyStore {
  id: number;
  name: string;
  age: number;
}

const request: IDBOpenDBRequest = indexedDB.open("myDatabase", 1);

request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
  const db = (event.target as IDBOpenDBRequest).result;

  // 创建对象存储如果它不存在
  if (!db.objectStoreNames.contains("myStore")) {
    const objectStore: IDBObjectStore = db.createObjectStore("myStore", {
      keyPath: "id",
      autoIncrement: true,
    });

    // 可选：添加一些索引
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("age", "age", { unique: false });
  }
};

request.onsuccess = function (event: Event) {
  const db = (event.target as IDBOpenDBRequest).result;

  // 使用数据库
  console.log("数据库打开成功。");

  // 示例：添加数据到数据库
  addData(db);
};

request.onerror = function (event: Event) {
  console.error("打开数据库时出错:", (event.target as IDBOpenDBRequest).error);
};

function addData(db: IDBDatabase) {
  const transaction = db.transaction(["myStore"], "readwrite");
  const objectStore = transaction.objectStore("myStore");

  const data: MyStore[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
  ];

  data.forEach((item) => {
    const request = objectStore.add(item);

    request.onsuccess = function (event) {
      console.log("数据添加成功。");
    };

    request.onerror = function (event) {
      console.error("添加数据时出错:", (event.target as IDBRequest).error);
    };
  });

  transaction.oncomplete = function (event) {
    console.log("事务完成。");
  };

  transaction.onerror = function (event) {
    console.error("事务出错:", (event.target as IDBTransaction).error);
  };
}

import { addBox } from "./box";

// 打开或创建数据库
function openDB(userId: string): IDBOpenDBRequest {
  const dbName = `LeitnerDB_${userId}`;
  let dbRequest: IDBOpenDBRequest = indexedDB.open(dbName, 1);

  dbRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result;
    console.log("onupgradeneeded success");
    // 创建ObjectStore
    if (!db.objectStoreNames.contains("users")) {
      const userStore = db.createObjectStore("users", { keyPath: "id" });
      userStore.createIndex("username", "username", { unique: true });
    }

    if (!db.objectStoreNames.contains("boxes")) {
      const boxStore = db.createObjectStore("boxes", { keyPath: "id" });
      boxStore.createIndex("boxName", "boxName", { unique: false });
    }

    if (!db.objectStoreNames.contains("cards")) {
      const cardStore = db.createObjectStore("cards", { keyPath: "id" });
      cardStore.createIndex("deck", "deck", { unique: false });
      cardStore.createIndex("boxId", "boxId", { unique: false });
    }

    if (!db.objectStoreNames.contains("tags")) {
      const tagStore = db.createObjectStore("tags", { keyPath: "id" });
      tagStore.createIndex("name", "name", { unique: true });
    }
  };

  dbRequest.onsuccess = (event: Event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    console.log("openDB success");
    const transaction = db.transaction(["boxes"], "readonly");
    const objectStore = transaction.objectStore("boxes");
    const request = objectStore.getAll();
    // add a default box
    request.onsuccess = (event: Event) => {
      const boxes = (event.target as IDBRequest).result;
      if (boxes.length === 0) {
        const newBox: Box = {
          id: 1,
          boxName: "Default Box",
          creationDate: new Date(),
          lastModified: new Date(),
          emoji: "📚",
          count: 0,
          repetitions: 0,
          currentLesson: 0,
          initialDecks: [],
        };
        addBox(db, newBox);
      }
    };
  };

  dbRequest.onerror = (event: Event) => {
    const request = event.target as IDBRequest;
    console.error("openDB error", (event.target as IDBOpenDBRequest).error);
  };

  return dbRequest;
}

function initDb(userId: string) {
  // 使用 userId 初始化 IndexedDB 数据库
  const request = openDB(userId);
  return request;
}

export { openDB, initDb };

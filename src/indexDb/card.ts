function addCard(db: IDBDatabase, card: Card): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    if (!card.id) {
      reject(new Error("Card must have an id"));
      return;
    }
    const transaction = db.transaction(["cards"], "readwrite");
    const store = transaction.objectStore("cards");
    const request = store.add(card);

    request.onsuccess = () => {
      console.log("Card added successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error adding card: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function deleteCard(db: IDBDatabase, cardId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readwrite");
    const store = transaction.objectStore("cards");
    const request = store.delete(cardId);

    request.onsuccess = () => {
      console.log("Card deleted successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error deleting card: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function updateCard(db: IDBDatabase, card: Card): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readwrite");
    const store = transaction.objectStore("cards");
    const request = store.put(card);

    request.onsuccess = () => {
      console.log("Card updated successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error updating card: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getCardById(db: IDBDatabase, cardId: number): Promise<Card> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readonly");
    const store = transaction.objectStore("cards");
    const request = store.get(cardId);

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("Card retrieved successfully:", event.target.result);
        resolve(request.result);
      } else {
        console.log("Card not found");
        reject("Card not found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving card: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getAllCards(db: IDBDatabase): Promise<Card[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readonly");
    const store = transaction.objectStore("cards");
    const request = store.getAll();

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("All cards retrieved:", event.target.result);
        resolve(request.result);
      } else {
        console.log("No cards found");
        reject("No cards found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving all cards: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getCardsByBoxId(db: IDBDatabase, boxId: number): Promise<Card[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readonly");
    const store = transaction.objectStore("cards");
    const index = store.index("boxId");
    const request = index.getAll(boxId);

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log(`Cards in box ${boxId} retrieved:`, event.target.result);
        resolve(request.result);
      } else {
        console.log(`No cards found in box ${boxId}`);
        reject("No cards found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving cards by box ID: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function countCards(db: IDBDatabase): Promise<number> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readonly");
    const store = transaction.objectStore("cards");
    const request = store.count();

    request.onsuccess = (event: any) => {
      console.log(`Total number of cards: ${event.target.result}`);
      resolve(event.target.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error counting cards: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getCardsByPage(
  db: IDBDatabase,
  currentPage: number,
  pageSize: number = 20
): Promise<Card[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["cards"], "readonly");
    const store = transaction.objectStore("cards");
    let cards: Card[] = [];
    let count = 0;

    // 使用游标遍历
    const request = store.openCursor();

    request.onsuccess = (event: any) => {
      const cursor = event.target.result;
      if (cursor) {
        // 计算是否在当前页的数据范围内
        if (
          count >= (currentPage - 1) * pageSize &&
          count < currentPage * pageSize
        ) {
          cards.push(cursor.value);
        }
        count++;
        cursor.continue();
      } else {
        console.log(`Cards on page ${currentPage}:`, cards);
        resolve(cards);
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving cards by page: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

export {
  addCard,
  deleteCard,
  updateCard,
  getAllCards,
  getCardById,
  countCards,
  getCardsByBoxId,
  getCardsByPage,
};

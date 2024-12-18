function addBox(db: IDBDatabase, box: Box): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["boxes"], "readwrite");
    const store = transaction.objectStore("boxes");
    const request = store.add(box);

    request.onsuccess = () => {
      console.log("Box added successfully", request.result);
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error adding box: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function deleteBox(db: IDBDatabase, boxId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["boxes"], "readwrite");
    const store = transaction.objectStore("boxes");
    const request = store.delete(boxId);

    request.onsuccess = () => {
      console.log("Box deleted successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error deleting box: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function updateBox(db: IDBDatabase, box: Box): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["boxes"], "readwrite");
    const store = transaction.objectStore("boxes");
    const request = store.put(box);

    request.onsuccess = () => {
      console.log("Box updated successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error updating box: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getBoxById(db: IDBDatabase, boxId: number): Promise<Box> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["boxes"], "readonly");
    const store = transaction.objectStore("boxes");
    const request = store.get(boxId);

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("Box retrieved successfully:", event.target.result);
        resolve(request.result);
      } else {
        reject("Box not found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving box: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

export { addBox, deleteBox, updateBox, getBoxById };

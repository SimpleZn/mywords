function addBox(db: IDBDatabase, box: Box): void {
  const transaction = db.transaction(["boxes"], "readwrite");
  const store = transaction.objectStore("boxes");
  const request = store.add(box);

  request.onsuccess = () => {
    console.log("Box added successfully");
  };

  request.onerror = (event: any) => {
    console.error(`Error adding box: ${event.target.error}`);
  };
}

function deleteBox(db: IDBDatabase, boxId: number): void {
  const transaction = db.transaction(["boxes"], "readwrite");
  const store = transaction.objectStore("boxes");
  const request = store.delete(boxId);

  request.onsuccess = () => {
    console.log("Box deleted successfully");
  };

  request.onerror = (event: any) => {
    console.error(`Error deleting box: ${event.target.error}`);
  };
}

function updateBox(db: IDBDatabase, box: Box): void {
  const transaction = db.transaction(["boxes"], "readwrite");
  const store = transaction.objectStore("boxes");
  const request = store.put(box);

  request.onsuccess = () => {
    console.log("Box updated successfully");
  };

  request.onerror = (event: any) => {
    console.error(`Error updating box: ${event.target.error}`);
  };
}

function getBoxById(db: IDBDatabase, boxId: number): void {
  const transaction = db.transaction(["boxes"], "readonly");
  const store = transaction.objectStore("boxes");
  const request = store.get(boxId);

  request.onsuccess = (event: any) => {
    if (event.target.result) {
      console.log("Box retrieved successfully:", event.target.result);
    } else {
      console.log("Box not found");
    }
  };

  request.onerror = (event: any) => {
    console.error(`Error retrieving box: ${event.target.error}`);
  };
}

export { addBox, deleteBox, updateBox, getBoxById };

function addTag(db: IDBDatabase, tag: Tag): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tags"], "readwrite");
    const store = transaction.objectStore("tags");
    const request = store.add(tag);

    request.onsuccess = () => {
      console.log("Tag added successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error adding tag: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function deleteTag(db: IDBDatabase, tagId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tags"], "readwrite");
    const store = transaction.objectStore("tags");
    const request = store.delete(tagId);

    request.onsuccess = () => {
      console.log("Tag deleted successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error deleting tag: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function updateTag(db: IDBDatabase, tag: Tag): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tags"], "readwrite");
    const store = transaction.objectStore("tags");
    const request = store.put(tag);

    request.onsuccess = () => {
      console.log("Tag updated successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error updating tag: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getTagById(db: IDBDatabase, tagId: number): Promise<Tag> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tags"], "readonly");
    const store = transaction.objectStore("tags");
    const request = store.get(tagId);

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("Tag retrieved successfully:", event.target.result);
        resolve(request.result);
      } else {
        console.log("Tag not found");
        reject("Tag not found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving tag: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

export { addTag, deleteTag, updateTag, getTagById };

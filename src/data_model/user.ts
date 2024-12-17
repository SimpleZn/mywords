function addUser(db: IDBDatabase, user: User): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    const request = store.add(user);

    request.onsuccess = () => {
      console.log("User added successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error adding user: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function deleteUser(db: IDBDatabase, userId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    const request = store.delete(userId);

    request.onsuccess = () => {
      console.log("User deleted successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error deleting user: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function updateUser(db: IDBDatabase, user: User): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");
    const request = store.put(user);

    request.onsuccess = () => {
      console.log("User updated successfully");
      resolve(request.result);
    };

    request.onerror = (event: any) => {
      console.error(`Error updating user: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getUserById(db: IDBDatabase, userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const request = store.get(userId);

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("User retrieved successfully:", event.target.result);
        resolve(event.target.result);
      } else {
        console.log("User not found");
        reject("User not found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving user: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getUserByUsername(db: IDBDatabase, username: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const index = store.index("username");
    const request = index.get(username);

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("User retrieved successfully:", event.target.result);
        resolve(event.target.result);
      } else {
        console.log("User not found");
        reject("User not found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving user by username: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

function getAllUsers(db: IDBDatabase): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const request = store.getAll();

    request.onsuccess = (event: any) => {
      if (event.target.result) {
        console.log("All users retrieved:", event.target.result);
        resolve(event.target.result);
      } else {
        console.log("No users found");
        reject("No users found");
      }
    };

    request.onerror = (event: any) => {
      console.error(`Error retrieving all users: ${event.target.error}`);
      reject(event.target.error);
    };
  });
}

export {
  addUser,
  updateUser,
  getUserByUsername,
  getAllUsers,
  deleteUser,
  getUserById,
};

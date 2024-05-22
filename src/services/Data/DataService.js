import firebase from "../../firebase";

const database = firebase.ref("/clothes");

const DataService = {
  getAll() {
    return database;
  },

  create(clothes) {
    return database.push(clothes);
  },

  update(key, value) {
    return database.child(key).update(value);
  },

  delete(key) {
    return database.child(key).remove();
  },

  deleteAll() {
    return database.remove();
  }
};

export { DataService }

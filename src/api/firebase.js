import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';


class FirebaseApi {

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut(){
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static GetValuesOnce(path, args = {}) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .limitToLast(args.limitToLast || 10)
      .once('value')
      .then(snapshot => FirebaseApi.mapSnapshotToArray(snapshot));
  }

  static databaseSet(path, value) {

    return firebase
      .database()
      .ref(path)
      .set(value);

  }

  /**
   * Mapping snapshot to array makes the code less dependent to firebase
   * And it is more natural to go through an array in the UI components
   * @param {*} snapshot 
   */
  static mapSnapshotToArray(snapshot) {
    const values = [];
    snapshot.forEach((child) => {
      values.push({
        key: child.key,
        val: child.val()
      });
    });
    return values;
  }
}

export default FirebaseApi;

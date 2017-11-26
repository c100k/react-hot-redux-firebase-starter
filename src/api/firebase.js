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

  static GetRealTimeRef(path, onChildAdded, onChildChanged, args = {}) {
    const ref = firebase
      .database()
      .ref(path);
    
    // Avoid having multiple listeners leading to duplicate triggers : https://stackoverflow.com/a/40652682/1259118
    ref.off();

    if (args.limitToLast) {
      ref.limitToLast(args.limitToLast);
    }

    ref.on('child_added', (data) => {
      onChildAdded(FirebaseApi.mapRecord(data));
    });

    if (onChildChanged) {
      ref.on('child_changed', (data) => {
        onChildChanged(FirebaseApi.mapRecord(data));
      });
    }
  }

  static databaseSet(path, value) {

    return firebase
      .database()
      .ref(path)
      .set(value);

  }

  static mapRecord(record) {
    return {
      key: record.key,
      val: record.val()
    };
  }
}

export default FirebaseApi;

// react firebase package for mirroring state to firebase
import Rebase from 're-base';
import firebase from 'firebase';

// connect to the firebase DB !!
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDgTkD-AxhPbgHNLbLEpBhL-KX92oBWzow",
  authDomain: "catch-of-the-day-jelena-ncs.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jelena-ncs.firebaseio.com"
})
// connect to the firebase DB !!
const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;

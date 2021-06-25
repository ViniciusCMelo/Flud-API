const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://flud-reactnative-default-rtdb.firebaseio.com"
});
const db = firebaseApp.firestore();

/*
db.collection("users").doc("lragozzine").set({
    first: 'Vinicius',
    last: 'Ragozzine',
    address: '133 5th St., San Francisco, CA',
    birthday: '05/13/1990',
    age: '30',
});
*/


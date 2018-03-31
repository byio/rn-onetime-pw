const functions = require('firebase-functions');

// import functions
const createUser = require('./create_user');

// export function to be used by google cloud functions
exports.createUser = functions.https.onRequest(createUser);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

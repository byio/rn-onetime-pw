const functions = require('firebase-functions');

// import functions
const createUser = require('./create_user');

// initialize service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rn-onetime-pw.firebaseio.com"
});

// export function to be used by google cloud functions
exports.createUser = functions.https.onRequest(createUser);

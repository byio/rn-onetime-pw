const functions = require('firebase-functions');
const admin = require('firebase-admin');

// import functions
const createUser = require('./create_user');
const requestOtp = require('./request_otp');
const verifyOtp = require('./verify_otp');

// initialize service account
const serviceAccount = require('./service_account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rn-onetime-pw.firebaseio.com"
});

// export function to be used by google cloud functions
exports.createUser = functions.https.onRequest(createUser);
exports.requestOtp = functions.https.onRequest(requestOtp);
exports.verifyOtp = functions.https.onRequest(verifyOtp);

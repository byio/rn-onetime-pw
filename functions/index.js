const functions = require('firebase-functions');

// import functions
const createUser = require('./create_user');

// export function to be used by google cloud functions
exports.createUser = functions.https.onRequest(createUser);

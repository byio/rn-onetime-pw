const twilio = require('twilio');

// twilio credentials
const twilioCred = require('./twilio_cred.json');
const accountSid = twilioCred.accountSid;
const authToken = twilioCred.authToken;

// create and export new instant of twilio client
module.exports = new twilio.Twilio(accountSid, authToken);

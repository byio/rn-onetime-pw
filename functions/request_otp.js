const admin = require('firebase-admin');

const twilioCred = require('./twilio_cred');
const twilio = require('./twilio');

// create and export requestOtp function
module.exports = (req, res) => {
  // verify that phone number is provided
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number.' });
  }
  // format phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, "")
  // find saved user from firebase auth
  admin.auth()
       .getUser(phone)
       .then(userRecord => {
         // generate code to be sent
         const code = Math.floor(Math.random() * 8999 + 1000);
         // text user
         twilio.messages.create({
           body: `Your code is ${code}.`,
           to: `+${phone}`,
           from: twilioCred.fromPhone
         }, (err) => {
           // if there's an error
           if (err) {
             return res.status(422).send({ error: err });
           }
           // save code to  user in firebase db if no error
           admin.database()
                .ref('users/' + phone)
                .update({
                  code: code,
                  codeValid: true
                }, () => {
                  res.send({ success: true });
                });
         });
         return null;
       })
       .catch(err => {
         // res.status(422).send({ error: 'User not found' })
         res.status(422).send({ error: err });
       });
};

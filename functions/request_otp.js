const admin = require('firebase-admin');

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
       })
       .catch(err => {
         // res.status(422).send({ error: 'User not found' })
         res.status(422).send({ error: err });
       });
};

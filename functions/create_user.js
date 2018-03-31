const admin = require('firebase-admin');

module.exports = (req, res) => {
  // verify that phone number (req.body.phone) is provided
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }
  // format phone number (convert to string, and remove anything that's not a number)
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  // create a new user account using phone number (id)
  admin.auth()
       .createUser({ uid: phone })
       .then(user => res.send(user))
       .catch(err => res.send({ error: err }))
  // respond to user request, saying that account was created

};

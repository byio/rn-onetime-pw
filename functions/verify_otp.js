const admin = require('firebase-admin');

// create and export verifyOtp function
module.export = (req, res) => {
  // check for phone number and otp
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided.' });
  }
  // format phone number and otp
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);
  // find user using phone number, and attempt to match otp
  admin.auth()
       .getUser(phone)
       .then(userRecord => {
         // create a reference to the user
         const ref = admin.database().ref('users/' + phone);
         // listen to value changes in ref
         ref.on('value', snapshot => {
           // stop listening on ref after snapshot is returns
           ref.off();
           const userRecord = snapshot.val();
           // if otp doesn't match or has expired
           if (userRecord.code !== code || !user.codeValid) {
             return res.status(422).send({ error: 'Invalid code.' });
           }
           // update codeValid property
           ref.update({ codeValid: false });
           // create and return jwt to authenticate user
           admin.auth()
                .createCustomToken(phone)
                .then(token => {
                  res.send({ token });
                  return null;
                })
                .catch(err => {
                  res.status(422).send({ error: err });
                });
         });
         return null;
       })
       .catch(err => {
         // if user cannot be found
         res.status(422).send({ error: err });
       });
};

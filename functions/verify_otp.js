// create and export verifyOtp function
modules.export = (req, res) => {
  // check for phone number and otp
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided.' });
  }
  // format phone number and otp
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);
  
};

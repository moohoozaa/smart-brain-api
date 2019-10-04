module.exports.handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Incorrect form submission' })
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      //console.log(data)
      const hash = data.length ? data[0].hash : ''
      const isValid = bcrypt.compareSync(password, hash)
      if (isValid) {
        db.select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json(err))
      } else {
        //console.log('wrong password')
        res.status(400).json({ msg: 'wrong password' })
      }
    })
    .catch(err => {
      //console.log('not found', err)
      res.status(400).json(err)
    })
}

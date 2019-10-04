module.exports.handleProfileGet = (req, res, db) => {
  const { id } = req.params
  let found = false
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json({ msg: 'user not found' })
      }
    })
    .catch(err => res.status(400).json(err))
}

const {findLatest} = require('../models/queries');

module.exports = (req, res) => {
  findLatest()
  .then(latest => {console.log(latest);res.render('home', {latest})})
  .catch(err => console.log(err));
}

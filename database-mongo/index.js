var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/coffee', { useNewUrlParser: true, useUnifiedTopology: true }
);;

mongoose.connection.on('error', function() {
  console.log('mongoose connection error');
});

mongoose.connection.once('open', function() {
  console.log('mongoose connected successfully');
});

module.exports = {
  db
}
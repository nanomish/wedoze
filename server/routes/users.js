var mongoose = require('mongoose');
var User = mongoose.model('User');

var users = {
 
  getAll: function(req, res) {
    console.log('user.getAll')
    User.fidn({}, (err, users) => {
      if (!!users) {
        res.status(200);
        res.json(users);
        return;
      } else {
        res.status(401);
        res.json({
          "status": 401,
          "message": err
        }); 
        return;  
      }
    })
  },
 
  getOne: function(req, res) {
    console.log('user.getOne, params:', req.params)
    var id = req.params.id;
  
    User.findOne({"_id": id}, function(err, user) {
      if (!!user) {
        console.log('found one user: ', user);
        res.status(200);
        res.json(user);
        return;
      }
      if (!!err) {
        console.log('error getting one: ', err);
        res.status(401);
        res.json({
          "status": 401,
          "message": err
        }); 
        return;
      }
    });
  },
 
  create: function(req, res) {
    var newuser = req.body;
    data.push(newuser); // Spoof a DB call
    res.json(newuser);
  },
 
  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];
 
module.exports = users;

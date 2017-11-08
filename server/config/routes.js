var Users = require('./../controllers/users.js');
module.exports = (app)=>{
	app.get('/', Users.index);
	app.post('/users', Users.create);
}
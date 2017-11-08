var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
	index: (req,res)=>{
		console.log("hit index");
		res.render('index', {errors: {}});
	},
	create: (req, res)=>{
		console.log("hit create");
		let user = new User(req.body);
		let errors = {};
		if(req.body.password != req.body.password_confirmation){
			// errors = {
			// 	password:{ message: "Passwords must match"}
			// }
			// res.json(errors);
			errors.password = {message: "Passwords must match"};
			res.render('index', {errors:errors});
		}else{
			user.save((err)=>{
				if(err){
					if(err['errmsg'] != undefined){
						// errors = {
						// 	email:{ message: "Email already taken"}
						// }
						// res.json(errors);
						errors.email = { message: "Email already taken"}
					}else{
						errors = err.errors;
					}
					res.render('index', {errors: errors})
				}else{
					console.log("registered");
					res.render('index', {errors: errors});
				}
			})
		}
	}
}
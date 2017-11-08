var mongoose = require('mongoose');
var bcryptP = require('bcrypt-as-promised');
var UserSchema = mongoose.Schema({
	name:{type:String},
	email: {type: String, unique:true},
	password: {
		type:String
	},
	dob: {
		type: Date,
		validate:[{
					validator: (input)=>{
						var start = new Date('1/1/1990');
						var end = new Date('12/31/1999');
						console.log(input, start, end);
						if(input < start || input > end){
							return false;
						}else{
							return true;
						}
					},
					message: "Not tubular, dude, as if!"
				}]
	}
})

UserSchema.pre('save', function(next){
	var user = this;
	console.log("this:", this);
	bcryptP.hash(user.password, 10)
	.then((hashed_password)=>{
		console.log("hashed_password", hashed_password);
		user.password = hashed_password;
		next();
	})
})
mongoose.model('User', UserSchema);
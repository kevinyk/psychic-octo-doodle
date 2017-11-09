var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
	console.log("this:", this);
	var user = this;
	bcrypt.hash(this.password, 10, function(err, hashed_password) {
	  // Store hash in your password DB.
	  if(err){
	  	console.log(err);
	  }else{
	  	console.log(hashed_password);
	  	user.password = hashed_password;
	  	next();
	  }
	});
})
mongoose.model('User', UserSchema);
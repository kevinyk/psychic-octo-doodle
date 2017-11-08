var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(session({secret:"Thisissupersecret"}));
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'static')));

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, ()=>{
	console.log("Only 90's kids will understand this.");
})
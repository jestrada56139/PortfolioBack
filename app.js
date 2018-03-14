var express = require('express');
// var server = require('./module');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var test = require('./routes/Challenge1/route');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt = 10;


mongoose.connect('mongodb://user020:userdata1999@ds257848.mlab.com:57848/zamora');
mongoose.connection.on('error', function(err) {
    if (err) throw err;
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName : String,
    lastName : String,
    password: String,
    email : String,
    pic : {
        type : String,
        default : './assets/bryan.jpg'
    },
  
    created :{
        type: Date,
        default : Date.now()
    },

    modified : {
        type: Date,
        default : Date.now()
    }
});
var User = mongoose.model('user', userSchema);

// middle ware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));


var xssService = {
    sanitize: function (req, res, next) {
            var data = req.body
            for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    data[key] = xss(data[key]);
                    console.log(data[key]);
                }
              
             }
             next();
    }
   
}

var bcryptService = {
    hash: function(req, res, next){
        bcrypt.hash(req.body.password, salt, function(err, res){
            if (err) throw err;
            req.body.password = res;
            console.log(res)
            next();
        })
    }
    
}


app.post('/admin/register', xssService.sanitize,bcryptService.hash, function(req,res,){
    var newUser = new User(req.body);
    newUser.save(function(err,product){
        if(err) throw err;
        console.log("user saved!");
        res.status(200).send({
            type: true,
            data: 'Succesfully Registered'})
        });
    });



app.post('/admin/login', function(req, res){
User.findOne({ 'email': req.body.email }, 'password', function (err, product){
  if (err) throw err;
    console.log(product);
    if (product === null){
        res.status(200).send({
            type: false,
            data: 'Email does not exist'
    })
    
 } else {
        if (req.body.password === product.password){
            res.status(200).send({
                type: true,
                data: 'Welcome to the summoners Rift'
            })
        } else {
            res.status(200).send({
                type: false,
                data: 'Incorrect Password'
            })
    
        }
    }


})
})


// listen on port 3000
app.listen(port,function (){
    console.log('listening on port: ',port);


})

// app.post('/createUser', function(req,res){
//     var newUser = new User(req.body);
//     newUser.save(function(err,product){
//         if(err) throw err;
//         console.log("user saved!");
//         res.status(200).send({
//             zamora: 'user saved!'
//         });
//     });
// });

// app.post('/getUser', function(req,res){
//     var newUser = new User(req.body);
//     User.find({ 'firstName': req.body.firstName }, 'firstName lastName email dob', function (err, data) {
//         if (err) throw err;
//         console.log(data);
//         res.status(200).send({
//             data: data
//         });
//     });

// });

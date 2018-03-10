var express = require('express');
var server = require('./module');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var test = require('./routes/Challenge1/route');
var mongoose = require('mongoose');


mongoose.connect('mongodb://user020:userdata1999@ds257848.mlab.com:57848/zamora');
mongoose.connection.on('error', function(err) {
    if (err) throw err;
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    dob: String,
    email: String,
    password: {
        type: String,
        required: true
    }
});
var User = mongoose.model('user', userSchema);

// middle ware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.post('/createUser', function(req,res){
    var newUser = new User(req.body);
    newUser.save(function(err,product){
        if(err) throw err;
        console.log("user saved!");
        res.status(200).send({
            zamora: 'user saved!'
        });
    });
});

app.post('/getUser', function(req,res){
    var newUser = new User(req.body);
    User.find({ 'firstName': req.body.firstName }, 'firstName lastName email dob', function (err, data) {
        if (err) throw err;
        console.log(data);
        res.status(200).send({
            data: data
        });
    });

});

// listen on port 3000
app.listen(port,function (){
    console.log('listening on port: ',port);
    var newUser = new User(
        {
            firstName: 'roberto',
            dob: '01-02-1993',
            email: 'roberto@urbantxt.com',
            password: 'robiscool999'
        }
    );
    newUser.save();
});

// User.find({'_id': '5a9f6d09395c9832e528884d' },'firstName lastName email dob',function(err, data){
//     if(err) throw err;
//     console.log(data);
// });
    // var newUser = new User(
    //     {
    //         firstName: 'roberto',
    //         lastName: 'sanchez',
    //         dob: '01-02-1993',
    //         email: 'roberto@urbantxt.com',
    //         password: 'robiscool99'
    //     }
    // );
    // newUser.save();
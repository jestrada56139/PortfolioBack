var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var test = require('./routes/Challenge1/route');
var mongoose = require('mongoose');
var db = mongoose.connection;

//Connecting to db
mongoose.connect('mongodb://localhost/test');


//on succesful connnection
db.once('open', () => {
    console.log('connected to database');
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use('/test', test);

app.listen(port,function (){
    console.log('listening on port: ',port);
});

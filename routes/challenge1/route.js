var express = require('express');
var router = express.Router();

router.get('/GetData', function(req, res){
    var data = {
        fullname: ' Ricky Martinez',
        age: '16',
        dob: '03/12/01',
        email: 'email@gmail.com',
        username: '',
        password: ''
    };
    res.status(200).send(data);
});


router.post('/GetData',function(req, res){
    var data = {
        fullname: ' Bryan Zamora',
        age: '16',
        dob: '03/12/01',
        email: 'email@gmail.com',
        username: '',
        password: ''
    };
    data.username = req.body.username;
    data.password = req.body.password;
    res.status(200).send(data);
});
module.exports = router;
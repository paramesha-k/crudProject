const mongoose = require('mongoose');


const conn=mongoose.connect('mongodb://127.0.0.1:27017/loc8r');
conn
    .then(() => console.log('Connected!'))
    .catch((errormsg)=> console.log('the mongodb instance is not runing!'));


module.exports = conn;
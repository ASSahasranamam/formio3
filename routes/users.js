var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//mongoose.connect('104.154.188.76:27017/test');
//var Schema = mongoose.Schema;
//var id = mongoose.Types.ObjectId();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://104.154.188.76:27017/test";
var ObjectID = require('mongodb').ObjectID;
var http = require('http');
var GenerateSchema = require('generate-schema');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('result');
});

router.post('/fetch', function (req, res, next) {
    console.log("inside users/fetch")
    var q = req.body.query;
    q = "tbl" + q;
    console.log(q);
    var data;

    MongoClient.connect(url, function (err, db) {
        //assert.equal(null, err);
        console.log("Connected correctly to server.");

         db.collection(q).find({ },{ _id: 0,  __v : 0} ).toArray(function (err, result) {
            if (err) throw err;
             data=result;
             res.send(result);
             console.log(result);
             console.log(typeof result);
        });
   //     res.send(data);
        db.close();
    });

});

module.exports = router;

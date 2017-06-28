var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('104.154.188.76:27017/test');
var Schema = mongoose.Schema;
var id = mongoose.Types.ObjectId();
var ObjectID = require('mongodb').ObjectID;
var http = require('http');

var request = require('request');
var iditem;
var infomdata;


var userDataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    script: String,
}, {
    collection: 'userData'
});

var UserData = mongoose.model('UserData', userDataSchema);




/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('newtemp', {
        title: 'Express'
    });
});
router.get('/test', function (req, res, next) {
    res.render('temp1', {
        title: 'Express'
    });
});

router.get('/display', function (req, res, next) {
    res.render('display', {
        title: 'Express'
    });

    console.log("/display queryid" + req.query._id);
    UserData.find({
        _id: ObjectID(req.query._id)

    }, function (err, docs) {
        console.log("display: " + docs);
        infomdata = docs;
        // res.send(docs);
    });


});


//router.get('/get-info', function (req, res, next) {
//  res.render('display', {title: 'Express'});

//console.log("get data");

//  var data = UserData.find({}, function (err, docs) {
//    console.log(docs)
//  res.send(docs);
//});
//console.log(data);
// res.send(docs);
//});
var copyofid = "";

router.post('/insert', function (req, res, next) {
    // var i = JSON.stringify(req);
    //  console.log("$scope.questionelemnt :"+i);
    // console.log("req : "+req)
    console.log("outer.post");
    console.log("BODY: " + req.body);
    var body = req.body;
    var script = "";
    var script2 = '<input type="text" placeholder = "sample"/>';
    for (var i = 0; i < body.length; i++) {
        switch (body[i].type) {
            case 'text':
              
                var addon =  '<div class=list-group-item><span><label>' + body[i].question + '</label> : <input type =text placeholder=' + body[i].placeholder + ' ng-model='+ body[i].type + body[i].id  +'  > </span> </div>' + ' {{'+body[i].type + body[i].id+'}}';
                script = script + addon;
                break;

            case 'checkbox':
                var duplicator = "";
                for (var j = 0; j < body[i].content.length;j++) {
                    duplicator = duplicator + '<span><label>' + body[i].content[j] + '</label> : <input type=checkbox ng-model=' + body[i].id + j + ' ng-true-value=true ng-false-value=false></br>'
                }
                var addon = ' <div class=list-group-item><span><label>' + body[i].question + ' </br>' + duplicator +' </span> </div>';
                script = script + addon;
                break;

            case 'radio':
                var duplicator = "";
                for (var j = 0; j < body[i].content.length;j++)  {
                    duplicator = duplicator + '<span><label>' + body[i].content[j] + '</label> : <input type=radio ng-model='+ body[i].type+ body[i].id+' name ='+ body[i].id +' ></br>'
                }
                var addon = ' <div class=list-group-item><span><label>' + body[i].question + '</br>' + duplicator + '</span> </div>';
                script = script + addon;
                break;

            case 'button':
                var addon = ' <div class=list-group-item"><span><label>' + body[i].question + '</label> : <button   ng-model='+ body[i].question  + ' >' + body[i].buttontext  + '</button></span></div>    ';
                script = script + addon;
                break;
        }
        console.log(script);
    }

    var item = {
        _id: new ObjectID(),
      //  data: req.body,
        script: script
        // content: req.body.content,
        // author: req.body.author
    };
    console.log(item);

    UserData.create(item);

    var iditem = item._id.toString();
    console.log("iditem:  " + iditem);
    res.send(iditem);




});

router.post('/insert2', function (req, res, next) {
    // var i = JSON.stringify(req);
    //  console.log("$scope.questionelemnt :"+i);
    // console.log("req : "+req)
    console.log("outer.post");
    console.log(req.body);
    var body = req.body;
    console.log(body);
    var item = {
        _id: new ObjectID(),
        //data: req.body,
        script: "test"
        // content: req.body.content,
        // author: req.body.author
    };
    console.log(item);

    UserData.create(item);

    var iditem = item._id.toString();
    console.log("iditem:  " + iditem);
    res.send(iditem);




});

var smapleid;

router.get('/infom', function (req, res, next) {

    console.log("infomdata :" + infomdata);
    res.send(infomdata);
});


router.get('/get-info', function (req, next, res) {
    console.log("get data");

    res.render("display.ejs");
    console.log("get data");

    //console.log(req.query._id);
    //res.redirect("/display");
    //if(err){ throw err;
    // }
    UserData.find({

    }, function (err, docs) {
        console.log(docs);

    });
    console.log(data);
    res.send(docs);
});

module.exports = router;

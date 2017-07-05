var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var test =  mongoose.connect('104.154.188.76:27017/test');
//var formDatadb = mongoose.connect('104.154.188.76:27017/formData');
var Schema = mongoose.Schema;
//var id = mongoose.Types.ObjectId();
var ObjectID = require('mongodb').ObjectID;
var http = require('http');
var GenerateSchema = require('generate-schema');

var request = require('request');
var iditem;
var infomdata;


var userDataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    script: String,
    ngmod: [String],
    que: [String]
}, {
    collection: 'userData'
});

var UserData = test.model('UserData', userDataSchema);
console.log("test.type" + typeof userDataSchema);

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
     //  test = mongoose.connect('104.154.188.76:27017/test');

    res.render('display', {
        title: 'Express'
    });

    console.log("/display queryid" + req.query._id);


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
var ngarray = [];
router.post('/insert', function (req, res, next) {
  //  test =mongoose.connect('104.154.188.76:27017/test');

    // var i = JSON.stringify(req);
    //  console.log("$scope.questionelemnt :"+i);
    // console.log("req : "+req)
    console.log("outer.post");
    console.log("BODY: " + req.body);
    var body = req.body;
    var script = "";
    ngarray = [];
    que = [];
    ///var script2 = '<input type="text" placeholder = "sample"/>';
    //SCRIPT GEN BELOW
    for (var i = 0; i < body.length; i++) {
        switch (body[i].type) {
            case 'text':

                var addon = '<div class=list-group-item><span><label>' + body[i].question + '</label> : <input type =text placeholder=' + body[i].placeholder + ' ng-model=' + body[i].type + body[i].id + ' id=gen > </span> </div>' + ' {{' + body[i].type + body[i].id + '}}';
                ngarray.push(body[i].type + body[i].id);
                que.push(body[i].question);
                script = script + addon;
                break;

            case 'checkbox':
                var duplicator = "";
                for (var j = 0; j < body[i].content.length; j++) {
                    duplicator = duplicator + '<span><label>' + body[i].content[j] + '</label> : <input type=checkbox ng-model=' + body[i].type + body[i].id + j + ' ng-checked=false></br>';
                    ngarray.push(body[i].type + body[i].id + j);
                    que.push(body[i].question + '_' + body[i].content[j]);
                }
                var addon = ' <div class=list-group-item><span><label>' + body[i].question + ' </br>' + duplicator + ' </span> </div>';
                script = script + addon;
                break;

            case 'radio':
                var duplicator = "";
                for (var j = 0; j < body[i].content.length; j++) {
                    duplicator = duplicator + '<span><label>' + body[i].content[j] + '</label> : <input type=radio ng-model=' + body[i].type + body[i].id + ' name =' + body[i].id + ' value= ' + body[i].content[j] + '></br>';
                    console.log("radio :  " + body[i].content[j]);


                }
                var addon = ' <div class=list-group-item><span><label>' + body[i].question + '</br>' + duplicator + '</span> </div> ' + ' {{' + body[i].type + body[i].id + '}}';
                que.push(body[i].question);
                ngarray.push(body[i].type + body[i].id);
                script = script + addon;
                break;

            case 'button':
                var addon = ' <div class=list-group-item"><span><label>' + body[i].type + body[i].id + '</label> : <button   ng-model=' + body[i].question + ' >' + body[i].buttontext + '</button></span></div> ';
                script = script + addon;
                break;
        }
        console.log(script);
        console.log("que : " + que);
    }

    var item = {
        _id: new ObjectID(),
        //  data: req.body,
        script: script,
        que: que,
        ngmod: ngarray
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

router.post('/infom', function (req, res, next) {
    console.log("post /infom func");
    console.log(req.body.query);
    UserData.find({
        _id: ObjectID(req.body.query)

    }, 'script -_id ', function (err, docs) {
        console.log("display: " + docs);
        //  infomdata=docs;
        //if (err){ throw err};
        res.send(docs);
        //infomdata=infomdata.slice(12);
        //console.log(infomdata);
    });

    //    console.log("infomdata :" + docs);
    //res.send(infomdata);
});

router.post('/ngarr', function (req, res, next) {

    console.log("post /ngarr func");
    console.log(req.body.query);
    UserData.find({
        _id: ObjectID(req.body.query)

    }, 'ngmod -_id ', function (err, docs) {
        console.log("ngmod: " + docs);
        //  infomdata=docs;
        //if (err){ throw err};
        res.send(docs);
        //infomdata=infomdata.slice(12);
        //console.log(infomdata);
    });
});

router.post('/que', function (req, res, next) {

    console.log("post /que func");
    console.log(req.body.query);
    UserData.find({
        _id: ObjectID(req.body.query)

    }, 'que -_id ', function (err, docs) {
        console.log("que: " + docs);
        //  infomdata=docs;
        //if (err){ throw err};
        res.send(docs);
        //infomdata=infomdata.slice(12);
        //console.log(infomdata);
    });
});


var datatypes = []; //strips numbers off ngmod
var quest = []; //stores questions
var schematypes = []; //storesdatatyoes
var userinput; //stores userinput


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

var FormData;
var formDataSchema;

router.post('/insertCli', function (req, res, next) {
    delete mongoose.models['FormData'];

    
//    var test = mongoose.connect('104.154.188.76:27017/test');
    var query = req.body.query;
    console.log(query);
    //var jsonArrSch = [] ;
    var jsonStringSch = req.body.jsonStringSch;
    console.log(jsonStringSch);
    var jsonStringSchp = req.body.jsonStringSchp;
    //  jsonStringSchp=JSON.parse(jsonStringSchp);
    //  console.log(jsonStringSchp);
    var jsonStringAns = req.body.jsonStringAns;
    //  jsonStringAns=JSON.parse(jsonStringAns);
    console.log(jsonStringAns);
    //console.log(err);
    // var jsonArrSch0=JSON.parse(jsonArrSch[0]);
    //console.log(jsonArrSch0);

    console.log("inside func");
    formDataSchema = GenerateSchema.mongoose(jsonStringAns);
    //new Schema(jsonStringSch, {strict:false});

    console.log("schema done");
    console.log(formDataSchema);
    //  console.log( typeof Data );
    //   console.log(userDataSchema);
    console.log("before");
    query = "tbl" + query;
    console.log(query);
    FormData = test.model('FormData', formDataSchema, query);
    console.log(typeof FormData);
    console.log("-------------------");
    console.log(FormData);
    var formData = new FormData(jsonStringAns);
    FormData.create(formData);
    //test.disconnect();
    res.send("helo");
});





//var FormData= new mongoose.model();

module.exports = router;

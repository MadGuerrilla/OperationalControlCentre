var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()

var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

// Connection URL to Mongo DB
var dbHost = '//localhost:27017/occ'
var dbUrl = 'mongodb:' + dbHost

var jsonParser = bodyParser.json()

var moment = require('moment')

function getMonday() {
    var today = new Date();
    var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 1) // Only manipulate the date if it isn't Mon.
        today.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
    today = moment(today).format().toString().split('T')[0];
    return {
        "timestampStarting": parseInt(moment(today).format('X')),
        "weekCommencing": 'w/c ' + moment(today).format('Do MMM'),
        "timestampEnding": parseInt(moment(today).format('X')) + 604799
    };
}

// Route index page
router.get('/', function(req, res) {
    res.redirect('national_view')
})

// add your routes here

router.get('/national_view', function(req, res) {
    res.render('national_view', {
        'js': ['map', 'nationalview']
    })
});

router.get('/dm', function(req, res) {
    res.render('dm')
});

router.get('/canterbury', function(req, res) {
    res.render('canterbury', {
        'js': ['tables', 'map', 'canterbury']
    })
});

router.get('/canterbury_jc', function(req, res) {
    res.render('canterbury_jc', {
        'js': ['tables', 'map', 'canterbury']
    })
});

router.get('/jc_alignment', function(req, res) {
    res.render('jc_alignment', {
        'js': ['tables', 'map', 'canterbury']
    })
});

router.get('/ssr', function(req, res) {
    // res.send({
    //     'weekCommencing': getMonday(),
    //     'pageData': [getData('bangor', getMonday())],
    //     'js': ['tables', 'datepicker', 'ssr']
    // })
    console.log(getData('bangor', getMonday()));
});

var getData = function(serviceCentre, weekCommencing) {
    var data = 'x';
    weekCommencing = weekCommencing.timestampStarting.toString();
    MongoClient.connect(dbUrl, data, function(err, db) {
        assert.equal(null, err);
        findDocuments(db, serviceCentre, weekCommencing, function(data) {
            //console.log(data);
            var data = data;
        });
    });
    console.log('data  ', data);
}

router.get('/ssr-old', function(req, res) {
    res.render('ssr-old', {
        'js': ['tables', 'datepicker', 'ssr-old']
    })
});


router.post('/timestamp', function(req, res) {
    res.send(getMonday())
});

router.post('/save/ssr', jsonParser, function(req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
        assert.equal(null, err);
        data = req.body;
        serviceCentre = req.body.serviceCentre;
        weekCommencing = req.body.weekCommencing;
        insertDocuments(db, data, serviceCentre, weekCommencing, function() {
            db.close();
        });
        findDocuments(db, serviceCentre, weekCommencing, function() {
            db.close();
        });
    });
    res.end();
});


// router.post('/load/ssr', jsonParser, function(req, res) {
//     serviceCentre = req.body.serviceCentre;
//     weekCommencing = req.body.weekCommencing;
//     console.log(weekCommencing);
//     MongoClient.connect(dbUrl, function(err, db) {
//         assert.equal(null, err);
//         findDocuments(db, serviceCentre, weekCommencing, function(data) {
//             db.close();
//             if (data.length == 0) {
//                 data = [];
//                 res.send(data);
//             } else {
//                 data = data[data.length - 1];
//                 data = JSON.parse(data.data);
//                 res.send(data);
//             }
//         });
//     });
// });


router.get('/delete/all', function(req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
        removeDocument(db, 'bangor', function() {
            db.close();
        });
        findDocuments(db, 'bangor', function() {
            db.close();
        });
    });
    res.send('All documents deleted')
});

module.exports = router

var insertDocuments = function(db, data, serviceCentre, weekCommencing, callback) {
    var collection = db.collection(serviceCentre);
    collection.insertOne({
            _id: weekCommencing,
            data: data
        },
        function(err, result) {
            callback(result);
        });
}

var findDocuments = function(db, serviceCentre, weekCommencing, callback) {
    var collection = db.collection(serviceCentre);
    collection.find({
        _id: weekCommencing
    }).toArray(function(err, items) {
        callback(items);
    });
};

var removeDocument = function(db, documents, callback) {
    db.collection(documents).deleteMany({});
    console.log('Deleted documents');
}

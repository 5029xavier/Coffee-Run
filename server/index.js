const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../database-mongo/data.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/cafes', function (req, res) {
    db.cafeSelect(function(err, data) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});

app.get('/runs', function (req, res) {
    db.runSelect(req.params, function(err, data) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(data);
        }
    });
});

app.get('/locations', function(req, res) {
    db.locationSelect(function(err, data) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(data);
        }
    })
})
app.post('/runs/post', function (req, res) {
    console.log(req.body);
    db.postRun(req.body, function(err, success) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    })
});

app.post('/orders/post', function (req, res) {
    console.log(req.body);
    db.postOrder(req.body, function(err, success) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    })
});

app.delete('/runs/complete', function (req, res) {
    console.log(req.body)
    db.completeRun(req.body, function(err, success) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    })
});

app.post('/users/post', function (req, res) {
    db.createUser(req.body, function(err, user) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.json(user);
        }
    })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

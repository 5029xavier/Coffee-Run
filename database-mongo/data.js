const mongoose = require('mongoose');
const db = require('./index.js');

const cafeSchema = new mongoose.Schema({
    name : String,
    address: String,
    description: String,
    logo: String,
    menu: [{
      item: String,
      price: String,
      image: String
    }]
});
  
const runSchema = new mongoose.Schema({
    user: String,
    cafe: String,
    time: Date,
    location: String,
    order: [{
      name: String,
      item: String
    }]
});

const locationSchema = new mongoose.Schema({
    address: String,
    organization: String,
    nearbyCafes: [{
        cafeId: String
    }]
})

const userSchema = new mongoose.Schema({
    name: String,
    location: String,
    runs: []
})

let cafeSelect = function(callback) {
    Cafe.find({}, function(err, items) {
        if(err) {
            callback(err, null);
        } else {
            callback(null, items);
        }
    });
};

let runSelect = function(location, callback) {
    let filter = {
        // location: location.location
    };
    Run.find(filter, function(err, runs) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, runs);
        }
    });
};

let locationSelect = function(callback) {
    Location.find({}, function(err, locations) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, locations);
        }
    })
}

let postRun = function(runInfo, callback) {
    let newRun = {
        user: runInfo.user,
        name: runInfo.name,
        cafe: runInfo.cafe,
        time: runInfo.time,
        location: runInfo.location,
        order: runInfo.order
    };
    Run.create(newRun)
    .then(() => {
        callback(null, true)
    })
    .catch(err => {
        console.log('error creating run: ' + err);
        callback(err)
    })
}

let postOrder = function(orderInfo, callback) {
    let filter = { _id: orderInfo.runId };
    console.log(orderInfo);
    let update = orderInfo.order;
    Run.findByIdAndUpdate(filter._id, { $push: { order: { $each: update } }})
    .then(() => {
        callback(null, true);
    })
    .catch(err => {
        console.log('error posting order: ' + err);
        callback(err)
    })
}

let completeRun = function(runId, callback) {
    let filter = { _id: runId.runId };
    Run.deleteOne(filter)
    .then(() => {
        callback(null, true)
    }).catch(err => {
        console.log('error')
    })
}

let createUser = function(userInfo, callback) {
    let filter = {name: userInfo.name};
    let update = {name: userInfo.name, location: userInfo.location};
    User.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
    })
    .then(data => {
        callback(null, data);
    })
    .catch(err => {
        console.log('error creating user: ' + err);
    })
};

let Cafe = mongoose.model('Cafe', cafeSchema);
let Run = mongoose.model('Run', runSchema);
let User = mongoose.model('User', userSchema);
let Location = mongoose.model('Location', locationSchema);

module.exports = {
    Cafe,
    Run,
    User,
    Location,
    cafeSelect,
    runSelect,
    locationSelect,
    postRun,
    postOrder,
    completeRun,
    createUser
}    
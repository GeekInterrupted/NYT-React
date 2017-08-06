var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Promise = require("bluebird");

var Article = require('./models/Article.js');

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  

var uristring =
    process.env.MONGODB_URI || 'mongodb://localhost/nytreact';

    // Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.

mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }

});
var db = mongoose.connection;

//main route to the rendered React app
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

//saved articles route
app.get('/api/saved', function(req, res) {
  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

//save articles route
app.post('/api/saved', function(req, res){
  var newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });

});

//delete articles route
app.delete('/api/saved/:id', function(req, res){
  Article.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });

});


//set server to listen
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

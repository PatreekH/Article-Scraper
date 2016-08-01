
// Initialize Express app
var express = require('express');
var app = express();

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "ArticleScraper";
var collections = ["Articles"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.send("Hello world");
});

app.get('/all', function(req, res) {
  db.Articles.find({}, function (err, docs) {
    if (err) throw err
    res.send(docs);
  });
});

app.get('/scrape', function(req, res) {
	request('http://www.nytimes.com/pages/technology/index.html?action=click&region=TopBar&pgtype=SectionFront&module=SectionsNav&version=BrowseTree&contentCollection=Tech&t=qry170', function (error, response, html) {

	  	var $ = cheerio.load(html);

	  	$('.story').each(function(i, element){

	    	var scrape = $(this).text();

			db.Articles.insert({article: scrape}, function(err, saved){
				if (err) {
			      	console.log(err);
			    } else {
			    	console.log(saved);
			    }
			});

		});
/*		$('h3').each(function(i, element){

	    	var scrape = $(this).text();

			db.Articles.insert({titles: scrape}, function(err, saved){
				if (err) {
			      	console.log(err);
			    } else {
			    	console.log(saved);
			    }
			});

		});*/
		res.send("worked");
	});
});


/* -/-/-/-/-/-/-/-/-/-/-/-/- */


// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});

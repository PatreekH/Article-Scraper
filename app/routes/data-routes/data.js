
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');

module.exports = function(app, db){

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

		  		var title = $(element).find('a').text();
		  		var link = $(element).find('a').attr('href');
		  		var article = $(element).find('p').text();

		    	/*var scrape = $(this).text();*/

				db.Articles.insert({title: title, article: article, link: link, comments: []}, function(err, saved){
					if (err) {
				      	console.log(err);
				    } else {
				    	console.log(saved);
				    }
				});

			});
			res.send("worked");
		});
	});

	app.post('/article', function(req, res){
		db.Articles.find({}, function (err, docs) {
	    	if (err) throw err
	    	res.json(docs[req.body.counter]);
		});
	});

	app.post('/newcomment', function(req, res){
    	db.Articles.update({_id: mongojs.ObjectId(req.body.id)}, {$set: {comments: [req.body.comment]}}, function () {
    		// the update is complete
    		if (err) throw err
    		res.send(200);
    	});
	});

	app.get('/article', function(req, res){
		db.Articles.find({}, function (err, docs) {
	    	if (err) throw err
	    	res.json(docs[0]);
		});
	});

	/* -/-/-/-/-/-/-/-/-/-/-/-/- */

};


var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    url = "https://www.wilkescc.edu/about-us/directory/?letter=";

var alpha = ["a"];//"abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); 

var all_emails = [],
first_names = [],
last_names = [], 
counter = 0;

var everything = {
    content: []
};

// don't use for...in for arrays, it may behave unpredictably
alpha.forEach(function(letter) {
    request(url + letter.toLowerCase(), function(error, res, body){

        if (error) return console.log(error);
            
        counter++;
        var $ = cheerio.load(body);

        // turn this into a list of names
        var names = $('.w3-container.w3-twothird').toArray().map(n => $(n).text());
        // turn this into a list of e-mails
        var emails = $('a[href^="mailto:"]').toArray().map(a => a.attribs.href.replace("mailto:", "")).filter(e => e);

        names.forEach(function(name, i){

            name = name.match(/Name: (.*)/)[1];
            email = emails[i];
            
            console.log(name)
            console.log(email);
        });

    });
});
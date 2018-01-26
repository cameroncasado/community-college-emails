var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://www.pittcc.edu/contact/directory.html";

// var rl = readline.createInterface({
//     input: process.stdin, 
//     output: process.stdout
// });
    

var all_emails = [],
first_names = [],
last_names = [];

var everything = {
    content: []
};

request(url, function(error, res, body){
    if (!error){
        var $ = cheerio.load(body);



        getAll();

        function getAll(){

            var emails = $('[href^="mailto:"]');

            emails.each(function(i, email){

                        var thisHref = email.attribs.href;
                        
                       var thisEmail = thisHref.substring(7);


                       var thisName = email.children[0].data;


               everything.content.push({fullname: thisName, email: thisEmail});
     
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/pitt.json', json, 'utf8');

            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/pitt.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
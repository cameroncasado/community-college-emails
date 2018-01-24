var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://www.cvcc.edu/About_Us/Faculty_And_Staff/index.cfm";



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

            var row = $('[href^="mailto:"]');

            row.each(function(i, row){
               
                var thisHref = row.attribs.href;
                var thisEmail = thisHref.substring(7);
                var thisName = row.children[0].data;
                everything.content.push({fullname: thisName, email: thisEmail});
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/catawba.json', json, 'utf8');

            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/catawba.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.surry.edu/call-us/faculty-and-staff-directory";



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

            var row = $('.course_row');

            row.each(function(i, row){
                var thisName = row.children[0].next.children[0].children[0].data;
                var thisHref = row.children[0].next.children[0].attribs.href;
                var thisEmail = thisHref.substring(7);
                everything.content.push({fullname: thisName, email: thisEmail});
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/surry.json', json, 'utf8');

            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/surry.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
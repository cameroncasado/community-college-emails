var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://cfcc.edu/fasd/";



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
        setTimeout(function(){var $ = cheerio.load(body); getAll($);}, 5000)



 

        function getAll($){

            var row = $('tr[class^="row"]');

            row.each(function(i, row){
                var thisName = row.children[1].children[0].data;
                console.log(row.children[7].children[0].attribs.href)
            })


           


            // var json = JSON.stringify(everything);

            // fs.writeFile('output/json/capefear.json', json, 'utf8');

            // var fields = ['fullname', 'email']
            // try {
            //     var result = json2csv({data: everything["content"], fields: fields})
            //     fs.writeFile('output/csv/capefear.csv', result, 'utf8')
            // } catch (err) {
            //     console.error(err)
            // }



        } //getAll

  
        


    }
})
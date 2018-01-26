var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.haywood.edu/directory";



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

            var firstnames = $('.given-name');
            var lastnames = $('.family-name');
            var emails = $('a.email');

            emails.each(function(i, email){

                var thisHref = email.attribs.href;
                
                var thisEmail = thisHref.substring(7);
                
                var thisFirstName = firstnames[i].children[0].data;
                var thisLastName = lastnames[i].children[0].data;

              
                everything.content.push({firstname: thisFirstName, lastname: thisLastName, email: thisEmail});
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/haywood.json', json, 'utf8');

            var fields = ['firstname', 'lastname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/haywood.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://cravencc.edu/faculty-and-staff-directory/";

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

            var names = $('.column-1');
            var emails = $('.column-6');

            console.log(emails[1]);


            names.each(function(i, name){
            
                if (emails[i].children[0]!==undefined){
                    if (emails[i].children[0].attribs.href!==undefined){
                       
                        var thisHref = emails[i].children[0].attribs.href;
                        var thisEmail = thisHref.substring(7);
                        var thisName = name.children[0].data;
                        everything.content.push({fullname: thisName, email: thisEmail});
                    }
                    
                }
                
                
            })


           


            var json = JSON.stringify(everything);

           //fs.writeFile('output/json/craven.json', json, 'utf8');

            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/craven.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
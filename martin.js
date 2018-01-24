var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.martincc.edu/directory";

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

                    if (email.children[0].type === "tag"){
                        var thisHref = email.attribs.href;
                        var thisName = email.children[0].children[0].data;
                        var thisEmail = thisHref.substring(7);
                    }

                everything.content.push({fullname: thisName, email: thisEmail});
     
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/martin.json', json, 'utf8');

            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/martin.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
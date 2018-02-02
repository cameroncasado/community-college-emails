var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.vgcc.edu/directory?page=";



// var rl = readline.createInterface({
//     input: process.stdin, 
//     output: process.stdout
// });

// for (var c = 1; c<12; c++){
//     console.log(c)
// }  

    

var all_emails = [],
first_names = [],
last_names = [], 
counter = 0;

var everything = {
    content: []
};

for (var c = 1; c<12; ++c){
    // console.log(url + c)
    request(url + c, function(error, res, body){
   
        if (!error){
            var $ = cheerio.load(body);

            getAll();

            function getAll(){

                var emails = $('[href^="mailto:"]');

                emails.each(function(i, email){

                    if (email.attribs.href.includes("webmaster")){ var notAContact = true;} else {var notAContact = false;}

                    if (emails[i] !== undefined && !notAContact){
                        var thisHref = email.attribs.href;
                        var thisEmail = thisHref.substring(7);
                        var thisName = email.children[0].data;
                        console.log(thisEmail + " " + thisName);
                    }
                    
                    
                everything.content.push({fullname: thisName, email: thisEmail});
                })

            } //getAll
console.log(c);
        if (c == 12){
            console.log("last")
            var json = JSON.stringify(everything);

            fs.writeFile('output/json/vanceg.json', json, 'utf8');
        
            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/vanceg.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }
        }

        }

    })
}


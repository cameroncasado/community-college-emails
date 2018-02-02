var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.abtech.edu/employee-directory?FirstName=&LastName=&LastName_1=&Title=&Department=&page=";



// var rl = readline.createInterface({
//     input: process.stdin, 
//     output: process.stdout
// });

//61

var pages = [];
for (var c = 1; c<62; c++){
    pages.push(c)
} 
    

var all_emails = [],
first_names = [],
last_names = [], 
counter = 0;

var everything = {
    content: []
};


pages.forEach(function(i) {
    request(url + i, function(error, res, body){
        
        if (!error){
            counter++;
            var $ = cheerio.load(body);
            // console.log(body)

            getAll();

            function getAll(){

                var emails = $('[href^="mailto:"]');
                var names = $('.field-content strong');
                // console.log(names.length)

                emails.each(function(i, email){

                    if (names[i] !== undefined && names[i].children[0].data !== "Stephanie Gibbs"){
                        var thisHref = email.attribs.href;
                        var thisEmail = thisHref.substring(7);
                        var thisName = names[i].children[0].data;
                        // console.log(thisEmail);
                        // console.log(thisName);
                        everything.content.push({fullname: thisName, email: thisEmail});
                    }
                    
                        

                  
                })

            } //getAll

        if (counter == pages.length){
            var json = JSON.stringify(everything);

            fs.writeFile('output/json/abtech.json', json, 'utf8');
        
            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/abtech.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }
        }

        }
    });


});


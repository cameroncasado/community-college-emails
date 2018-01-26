var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.wilsoncc.edu/directory/";

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

            var emails = $('.directory-email');
            var names = $('.directory-name');

            emails.each(function(i, email){

                if (names[i].children[0].data !== "Shannon Campbell" && names[i].children[0].data !== "Richard Collier"){

                    var thisEmailText = email.children[0].data;
                    var thisEmail = thisEmailText.substring(7);
                    var thisName = names[i].children[0].data;
                    console.log(i + " " + thisName + ": " + thisEmail)
                }



              everything.content.push({fullname: thisName, email: thisEmail});
     
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/wilson.json', json, 'utf8');

            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/wilson.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
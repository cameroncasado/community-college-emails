var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://www.pamlicocc.edu/home-employeedirectory.php";



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

        //NAMES ARE NOT CONSISTENTLY FORMATTED ON THE PAGE

        function getAll(){

            // var names = $('p strong');
            // console.log(names.length)
            var emails = $('[href^="mailto:"]')
            console.log(emails.length)

            emails.each(function(i, email){

               // var thisName = names[i].data;
                //console.log(thisName)
        
                var thisEmail = email.children[0].data;
              // console.log(thisEmail)

              
               everything.content.push({email: thisEmail});
            })


           


            var json = JSON.stringify(everything);

            fs.writeFile('output/json/pamlico.json', json, 'utf8');

            var fields = ['email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/pamlico.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
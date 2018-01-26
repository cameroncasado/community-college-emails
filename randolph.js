var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "https://www.randolph.edu/employee-directory.html";



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

        console.log(body)



        getAll();

        function getAll(){

            var names = $('.dirname');
            console.log(names.length)
            var emails = $('[href^="mailto:"]')

            names.each(function(i, name){
                

                var thisName = name.children[3].data;
                console.log(thisName)
        
                // var thisEmail = emails[i].children[0].data;
               

              
               //everything.content.push({fullname: thisName, email: thisEmail});
            })


           


            // var json = JSON.stringify(everything);

            // fs.writeFile('output/json/randolph.json', json, 'utf8');

            // var fields = ['fullname', 'email']
            // try {
            //     var result = json2csv({data: everything["content"], fields: fields})
            //     fs.writeFile('output/csv/randolph.csv', result, 'utf8')
            // } catch (err) {
            //     console.error(err)
            // }



        } //getAll

  
        


    }
})
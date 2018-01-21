var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://clevelandcc.edu/directory.php";



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
            var names = $('table tbody tr td strong');
            names.each(function(i, table){

                thisName = table.children[0].data;
                thisLastName = thisName.split("  ")[1];
                thisFirstName = thisName.split("  ")[0];
                if(thisFirstName.includes("Dr.")){
                    thisFirstName = thisFirstName.substring(4)
                }
                if (!thisName.includes("  ")){
                    console.log("ERROR UNEXPECTED NAME: " + thisName);
                    thisFirstName = rl.question('What is the first name? ');
                    thisLastName = rl.question('What is the last name? ');
                    console.log("Inputting name as " + thisFirstName + " " + thisLastName + ".");
                    
                }
                if (table.next.next.next.next === null){
                    console.log("There is no email for " + thisName + ". Skipping.")
                    thisName = null;
                } 

                if (thisName !== null){
                    first_names.push(thisFirstName);
                    last_names.push(thisLastName);
                }
                
                
            })

            var emails = $('[href^="mailto:"]');
            emails.each(function(i, email){
                var href = email.attribs.href;
                var thisEmail = href.substring(7);
                all_emails.push(thisEmail);
            })

            for (i in first_names){
                everything.content.push({firstname: first_names[i], lastname: last_names[i], email: all_emails[i]});
            }


            var json = JSON.stringify(everything)

            fs.writeFile('output/json/clevelandcc.json', json, 'utf8');

            var fields = ['firstname', 'lastname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/clevelandcc.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }



        } //getAll

  
        


    }
})
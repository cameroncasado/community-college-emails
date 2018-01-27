var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    rl = require('readline-sync')
    url = "http://www.brunswickcc.edu/directory/";

// var rl = readline.createInterface({
//     input: process.stdin, 
//     output: process.stdout
// });

//generated from the alpha list on the page (doesn't include all letters)
var alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "R",
    "S",
    "T",
    "W",
    "Y",
    "Z",
    ];   

var all_emails = [],
first_names = [],
last_names = [],
counter = 0;

var everything = {
    content: []
};


for (i in alpha){
    // console.log("Collecting pages on: " + alpha[i] + ":")
    request(url + alpha[i], function(error, res, body){
        if (!error){
            counter++;
            var $ = cheerio.load(body);    
    
            getAll();
    
            function getAll(){
    
                var rows = $('.info-upper');
                var emails = $('.info-lower a')

                
    
                rows.each(function(i, row){

                //    console.log(row);
                
                    
                    if (emails[i].children[0] !== undefined){
                        var thisName = row.children[1].data;
                        //console.log(thisName)
                        var thisEmail = emails[i].children[0].data;
                        //console.log(thisEmail)
                    }
                    
                    everything.content.push({fullname: thisName, email: thisEmail});
                    
                    
                })
                if (counter == alpha.length){
                    // for (i in everything.content){
                    //     if (everything.content[i].fullname == undefined){
                    //        everything.content.splice(i,1);
                    //     }
                    // }
                    var json = JSON.stringify(everything);

                    fs.writeFile('output/json/brunswick.json', json, 'utf8');

                    var fields = ['fullname', 'email']
                    try {
                        var result = json2csv({data: everything["content"], fields: fields})
                        fs.writeFile('output/csv/brunswick.csv', result, 'utf8')
                    } catch (err) {
                        console.error(err)
                    }
                } //if
            }
        }
        })
    
           


            

        } //for loop
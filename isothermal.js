var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    json2csv = require("json2csv"),
    url = "https://www.isothermal.edu/about/directory/alphabetical/";

var alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
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
    request(url + alpha[i].toLowerCase() + ".html", function(error, res, body){
        
        if (!error){
            counter++;
            var $ = cheerio.load(body);
            // console.log(body)

            getAll();

            function getAll(){

                var emails = $('[href^="mailto:"]');
                var names = $('.five.column h3');
                // console.log(names.length)

                emails.each(function(i, email){

                    if (names[i] !== undefined){
                        var thisHref = email.attribs.href;
                        var thisEmail = thisHref.substring(7);
                        var thisName = names[i].children[0].data.trim();
                        if (thisName.includes("Dr.")){
                            thisName = thisName.trim().split("Dr.")[1].trim();
                        }
                        
                        // console.log(thisEmail)
                        // console.log(thisName)
                    }
                    
                        

                    
                everything.content.push({fullname: thisName, email: thisEmail});
                })

            } //getAll

        if (counter == alpha.length){
            var json = JSON.stringify(everything);

            fs.writeFile('output/json/isothermal.json', json, 'utf8');
        
            var fields = ['fullname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/isothermal.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }
        }

        }

    })
}


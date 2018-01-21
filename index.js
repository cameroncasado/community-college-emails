var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://clevelandcc.edu/directory.php";

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
                first_names.push(thisFirstName);
                last_names.push(thisLastName);
                
            })

            var emails = $('[href^="mailto:"]');
            emails.each(function(i, email){
                var href = email.attribs.href;
                var thisEmail = href.substring(7);
                all_emails.push(thisEmail);
            })

        }


    }
})
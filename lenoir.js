//found the original json for the page request through this request URL: 
//https://api.lenoircc.edu/core/model/Employees?filter[where][type][like]=%STAFF%&filter[where][approved]=1&filter[order]=lastname%20ASC&filter[order]=firstname%20ASC&filter[include]=building&filter[include]=position&filter[include]=position2&filter[include]=position3

var json2csv = require("json2csv");
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('lenoir.json', 'utf8'));

var all_emails = [],
first_names = [],
last_names = [];

var everything = {
    content: []
};

for (i in data){
    var thisFirstName = data[i].firstname;
    var thisLastName = data[i].lastname;
    var thisEmail = data[i].email;

    everything.content.push({firstname: thisFirstName, lastname: thisLastName, email: thisEmail});
}

var json = JSON.stringify(everything);

            fs.writeFile('output/json/lenoir.json', json, 'utf8');

            var fields = ['firstname','lastname', 'email']
            try {
                var result = json2csv({data: everything["content"], fields: fields})
                fs.writeFile('output/csv/lenoir.csv', result, 'utf8')
            } catch (err) {
                console.error(err)
            }
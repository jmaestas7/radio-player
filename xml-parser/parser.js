const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const inspect = require('eyes').inspector({maxLength: false});

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/Library.xml', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('The file does not exist');
            return;
        }
        throw err;
    }
    parser.parseString(data, function (err, result) {
        if (err) throw err;
        var myObject = result.plist.dict[0].dict[0].dict
        fs.writeFile("Object.json", JSON.stringify(myObject), (err) => {
            if (err) throw err;
            console.log(Object.keys(myObject).length);
            console.log("The file was succesfully saved!");
        }); 
        console.log('Done');
    });
});

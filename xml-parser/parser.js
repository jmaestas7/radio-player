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
        var myObject = result.plist.dict[0].dict[0].dict;
        var objectStr = "[{" ;

        for (i = 0; i < Object.keys(myObject).length; i++) {
            objectStr += '"' + myObject[i].key[0] + '": ';
            objectStr +=  myObject[i].integer[0] + ", \n ";
            objectStr += '"TrackInfo": {\n'
            objectStr +=  '"' + myObject[i].key[1] + '": ';
            objectStr +=  '"' + myObject[i].string[0] + '", \n';
            objectStr +=  '"' + myObject[i].key[2] + '": ';
            objectStr +=  '"' + myObject[i].string[1] + '", \n';
            objectStr += '"Location": "' + myObject[i].string[myObject[i].string.length - 1] + '" \n },';
            //Omitted due to different properties of tracks in different array locations (Album Artist, Size, Kind, etc.)
            // objectStr +=  '"' + myObject[i].key[5] + '": ';
            // objectStr +=  myObject[i].integer[2] + " \n },";
        }
    objectStr = objectStr.substring(",", objectStr.length - 1) + "}]";
        fs.writeFile("Object.json", objectStr, (err) => {
            if (err) throw err;
            console.log(Object.keys(myObject).length);
            console.log("The file was succesfully saved!");
        }); 
        console.log('Done');
    });
});

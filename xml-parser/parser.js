const fs = require('fs');
const xml2js = require('xml2js');

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/Library.xml', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('The file does not exist');
            return;
        }
        throw err;
    }
    parser.parseString(data, (err, res)  => {
        if (err) throw err;
        var myObject = res.plist.dict[0].dict[0].dict;
        var objectStr = '{\n\t"Tracks": {\n';
        var objLength  = Object.keys(myObject).length;

        for (i = 0; i < objLength; i++) {
            objectStr += '\t\t"T' + (i+1) + '": {\n';
            objectStr +=  '\t\t\t"' + myObject[i].key[1] + '": ';
            objectStr +=  '"' + myObject[i].string[0] + '",\n';
            objectStr +=  '\t\t\t"' + myObject[i].key[2] + '": ';
            objectStr +=  '"' + myObject[i].string[1] + '",\n';
            objectStr += '\t\t\t"Location": "' + myObject[i].string[myObject[i].string.length - 1] + '"\n\t\t},\n';
        }

        objectStr = objectStr.substring(0, objectStr.length-2);
        objectStr += "\n\t}\n}";
        fs.writeFile("musicData.json", objectStr, (err) => {
            if (err) throw err;
            console.log(Object.keys(myObject).length + " entries in object");
            console.log("The file was succesfully saved!");
        }); 
    });
});

const fs = require('fs');
const xml2js = require('xml2js');

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/Music.xml', (err, data) => {
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
        var objectStr = '[\t\n';
        var objLength  = Object.keys(myObject).length;

        for (i = 0; i < objLength; i++) {
            objectStr += '\t{\n';
            objectStr +=  '\t"' + myObject[i].key[1] + '": ';
            objectStr +=  '"' + myObject[i].string[0] + '",\n';
            objectStr +=  '\t"' + myObject[i].key[2] + '": ';
            objectStr +=  '"' + myObject[i].string[1] + '",\n';
            objectStr += '\t"Location": "' + myObject[i].string[myObject[i].string.length - 1] + '"\n\t},\n';
        }
        objectStr = objectStr.replace(
            /file:\\localhost\\C:\\Users\\Jarred\Desktop\radio-player\\xml-parser\working\\public\\music\singles%20(Heresey)%202-23-18/g,
            "/music/singles");

        fs.writeFile("musicData.json", objectStr, (err) => {
            if (err) throw err;
            console.log(Object.keys(myObject).length + " entries in object");
            console.log("The file was succesfully saved!");
        }); 
    });
});

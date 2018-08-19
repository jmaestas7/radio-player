var i = 0;
var source = $("#source");

function update(num) {
    $.get('/api/', function (data) {
        $("#name").text(data[num].Name);
        $("#artist").text(data[num].Artist);
        return data[num].Location;
    });
};

function getLocation(loc, num) {
    $.get('/api/', function (data) {
        var loc = "";
        loc = data[num].Location
        loc = loc.replace(
            "file://localhost/C:/Users/Jarred/Desktop/radio-player/xml-parser/working/public/music/singles%20(Heresey)%202-23-18",
            "/music/singles");
        $("#location").text(loc);
        return loc;
    });
};

$("#next").click(function (e) {
    var tLocation = getLocation(update(i), i);
    console.log(tLocation);
    source.on('load', function () {
        (source.attr("src", tLocation));
    });
    // if (i === myObject.length - 1) i = 0;
    i++;
});
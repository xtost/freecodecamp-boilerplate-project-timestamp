// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// ***
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ***
app.get("/api/:date?", function (req, res) {
  let reqpars = req.params.date;

  if (reqpars === undefined) {
    date = new Date(Date.now());
    var date_utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
    res.json({ unix: date_utc.getTime(), utc: date_utc.toUTCString() });
  } else {
    var arrayofstrings = reqpars.split('-');
    if (arrayofstrings.length === 3) {
      if (arrayofstrings[2].length === 0) arrayofstrings[2] = '01';
      date_utc = new Date(Date.UTC(arrayofstrings[0], arrayofstrings[1] - 1, arrayofstrings[2], 0, 0, 0));
      res.json({ unix: date_utc.getTime(), utc: date_utc.toUTCString() });
    } else if (!isNaN(reqpars)) {
      date_utc = new Date(parseInt(reqpars));
      res.json({ unix: date_utc.getTime(), utc: date_utc.toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

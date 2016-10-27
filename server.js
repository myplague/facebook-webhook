var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var VALIDATION_TOKEN = "910304";

//page acces token
//EAADxx35YCOABAJ5QF6ZB1HkAZBNuzFWM6eXwMy9vMOz6TKtZAUZA19b25ODdKUY4iymmsf1yUvDaZCYcF0TWWrJAxytiaPbOk4FgttkUUrBEtZBlpoE89ig0z08XsAJVdYHpZBeVo3BLJJ767kw2vTECWkU57x0T8nwNCQuSfYlBQZDZD

app.use(bodyParser.json()); //middleware

app.get("/", function(req, res) {
    res.end("This is the home page");
});

app.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === VALIDATION_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

app.post('/webhook', function(req, res) {
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object == 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function(pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;
            

            Iterate over each messaging event
            pageEntry.messaging.forEach(function(messagingEvent) {
              if (messagingEvent.optin) {
              if (detectAnger(messagingEvent.message.text)){
                console.log("received angry message!!");
              }
            }else {
              console.log("receied some kind of messaging event that wasn't a message");
              console.log(messagingEvent);
            }

            });

        });


        res.sendStatus(200);
    }
});



app.listen(process.env.PORT || 3000, function() {
    console.log("Server running");
});
function detectAnger(Chaves){
  chaves = chaves.toLowerCase();
  if (chaves.indexOf("mierda") >= 0 || chaves.indexOf("fuck") >= 0 || chaves.indexOf("shit") >= 0) {
    return true
  }else {
    return false
  }
}

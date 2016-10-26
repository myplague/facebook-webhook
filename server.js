var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json()); //middleware

app.get("/", function(req,res){
  res.end("This is the home page");
});

app.post("/webhook", function(req,res){

});
app.listen(process.env.PORT || 3000, function(){
  console.log("Server running");
});

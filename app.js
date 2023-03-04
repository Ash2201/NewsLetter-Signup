const express = require("express");
const BodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(BodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.Mail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/8f5c85acb"
    const options = {
        method: "POST",
        auth: "dhruv22:60350a56207f1161221ee43d2e04d7df-us11"
    }


    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/Success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server running at 3000");
})


//list id: 8f5c85acb8
//api key: 60350a56207f1161221ee43d2e04d7df-us11
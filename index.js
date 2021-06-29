const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to the database."));
db.once('open',()=>console.log("connection is successful with database."))

app.post("/signup",(req,res)=>{
    var name =req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;


    var data = {
        "name": name,
        "email":email,
        "phno": phno,
        "password":password
    }

    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("your data is recorded successfully!");
    })
    return res.redirect('signup_success.html');
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'  // it will give access to the remote database to take all data from the front-end.
    });
    return res.redirect('index.html')
});
app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port 3000 ");
})
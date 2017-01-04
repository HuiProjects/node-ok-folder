const express = require("express");
var hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080 ;

var app = express();

// app.use((req,res,next) =>{
//     res.render("maintance.hbs");
// });

//hbs.registerPartial('partial_name', 'partial value');
hbs.registerPartials(__dirname + '/views/partials');


app.use((req,res,next) =>{
    var now = new Date().toString();
    
    var log = `${now}:${req.method} ${req.url}`;
   
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {throw err} 
       console.log('The "data to append" was appended to file!'); 
 });
    console.log(log);
    next();
})

hbs.registerHelper('getCurrentYear', function() { 
  
  return new Date().getFullYear();
 
    
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});
app.set('view engine', 'hbs');

//app.use(express.static(__dirname + "/public"));

app.get("/", (req,res) =>{
    
   res.render('home.hbs',{pageTitle:'about page', welcome:'Welcome to my homepage'});
    
});

app.get("/about", (req,res) =>{
    
 
    res.render('about.hbs',{pageTitle:'about page',});
    
});











app.listen(port, () =>{
    console.log(`${port} good to go`);
});
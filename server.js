var express = require('express');
var hbs= require('hbs');
var fs = require('fs');
var port = process.env.PORT|| 3100;
var app = express();



app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();

});
    //app.use ka sequence imp hota h.
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log= `${now} ${req.method} ${req.url}` ;
    fs.appendFile('logger.txt',log + '\n' ,(err)=>{
        if(err){
            console.log("error in creating log");
        }
    });
    console.log(log);
    next();
// });
// app.use((req,res,next)=>{
//     res.render('maintainance.hbs')
// });
// app.get('/',(req,res)=>{
//     // res.send('<h1>Hello Express</h1>');
// res.send({
//     name:'aman',
//     age:22,
//     city:'bnglore',
//     likes:[
//         "cricket",
//         "games"
//     ]
// });
// });
});
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
res.render('home.hbs',{
    pageTitle:'home Page',
    // currentYear: new Date().getFullYear()

});
});

app.get('/about',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
res.render('about.hbs',{
    pageTitle:'About Page',
    // currentYear: new Date().getFullYear()
});
    
});             

app.get('/bad',(req,res)=>{
    // res.statusCode=400;
res.send({
    error:"invalid request",

});
});

app.get('/projects',(req,res)=>{
    // res.statusCode=400;
res.render('projects.hbs',{
    pageTitle:'Projects',
    

});
});
app.get('/help',(req,res)=>{
    // res.statusCode=400;
res.send('/help');
});
app.listen(port,()=>{
    console.log(`server started at ${port}`);
});
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine","ejs");

app.get('/',function(req,res){
    res.render('info.ejs');
});


app.post('/',function(req,res){
    const city = req.body.city;
    const url ="";
    https.get(url,function(response){
        // console.log(response.statusCode);
        // console.log(response);
          response.on("data",function(data){
                const weatherdata = JSON.parse(data);
                // console.log(weatherdata);
                if(weatherdata['cod']==200){
                    const temp = weatherdata.main.temp;
                    const descr = weatherdata.weather[0].description;
                    const icon = weatherdata.weather[0].icon;
                    const windspeed = weatherdata.wind.speed;
                    var context={
                        'temperature':temp,
                        'description':descr,
                        'iconImage':"http://openweathermap.org/img/wn/"+icon+"@2x.png",
                        'wind':windspeed,
                        'city':city,
                        'error_message':""
                    }


                }else{
                    var context ={
                        'city':city,
                        'error_message':"true"
                    }
                }
                
                res.render('info',context);
          })
    });
    // res.send(weather);
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at http://localhost:3000/");
})

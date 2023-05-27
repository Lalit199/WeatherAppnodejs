const http = require('http');
const fs = require("fs");
var requests =require( 'requests');

const homeFile = fs.readFileSync("home.html","utf-8");

const replaceval =(tempval,orgval)=>{
    let temperature = tempval.replace("{%tempval%}",orgval.main.temp);
     temperature = temperature.replace("{%tempmin%}",orgval.main.temp_min);
     temperature = temperature.replace("{%tempmax%}",orgval.main.temp_max);
     temperature = temperature.replace("{%location%}",orgval.name);
     temperature = temperature.replace("{%country%}",orgval.sys.country);
     temperature = temperature.replace("{%tempstatus%}",orgval.weather[0].main);
     return temperature;
    // let temprature = tempval.replace("{%tempval%}",orgval.main.temp);
    // let temprature = tempval.replace("{%tempval%}",orgval.main.temp);

};

const server = http.createServer((req,res)=>{

    if(req.url=="/"){
        
     requests("https://api.openweathermap.org/data/2.5/weather?q=PUNE&appid=b8e1cf3dfc43f6033c3b2b0b14240f18")
        .on('data',  (chunk) => {
            const objdata=JSON.parse(chunk);
            const arrdata= [objdata];
            const realtimedata = arrdata.map((val)=>  replaceval(homeFile,val)).join("");
            res.write(realtimedata);
            // console.log(realtimedata);
            })
        .on('end', (err) => {
             if (err) return console.log('connection closed due to errors', err);
 
            res.end();
            });
    }

});
server.listen(8000,"127.0.0.1");

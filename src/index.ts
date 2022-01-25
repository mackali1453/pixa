import router from "./Routers/HomeControllerRouter"; 
var bodyParser = require('body-parser')
let express = require('express'); //express is a modul which allow us to create rest-api.
let app = express(); //Creating instance of it
require('dotenv').config({
    path: 'C:/nodeJS/socket_io_task/src/.env'
  });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/",router); //Using router let us jumping between html pages.
app.listen(process.env.PORT,console.log(process.env.PORT)); 

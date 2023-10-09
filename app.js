const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const user = require('./rutas/user')
const mongoose = require('mongoose')

///*"test": "echo \"Error: no test specified\" && exit 1"*/

//mongodb+srv://<username>:<password>@cluster0.dokoe.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://AntonioMartinez:<password>@cluster0.dokoe.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://AntonioMartinez:E2wOWKayYiLCkfHH@cluster0.dokoe.mongodb.net/PictureSecurity2?retryWrites=true&w=majority
//password to MongoDB: E2wOWKayYiLCkfHH
//mongoose.connect('mongodb+srv://AntonioMartinez:E2wOWKayYiLCkfHH@cluster0.dokoe.mongodb.net/PictureSecurity?retryWrites=true&w=majority') 
mongoose.connect('mongodb+srv://antoniomgti20:antonio07@cluster0.ygpiacp.mongodb.net/PictureSecurity?retryWrites=true&w=majority') 
.then(()=>{
    console.log('Conectado a mongoDB')
})
.catch(()=>{
    console.log('Error al conectarse a mongoDB');
});


app.use('/estatico', express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'qwerty',
    resave:true,
    saveUninitialized:true
}));

app.use('/',user);

app.listen(process.env.PORT || 8080,()=>{
    console.log('Picture Security conneted in 8080')
});


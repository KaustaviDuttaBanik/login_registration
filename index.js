var express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//import routes
const authRoutes = require('./routes/authentication')
const userListRoute = require('./routes/queryRoute')

dotenv.config();

//DB connection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    (err)=> {
        if (err) {
            console.log(err)
        }else {
            console.log('connected to db')
        }
    })
    
//MiddleWare
app.use(express.json());

//Routing middlewares
app.use('/user', authRoutes);
app.use('/user/getUserList', userListRoute);

app.listen(8000,()=> console.log('up and running'));
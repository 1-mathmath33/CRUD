const express = require('express');
    const productRoutes = require('./api/routes/products')
    const orderRoutes = require('./api/routes/orders'); //access the orders route
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose'); //   include mongoose

//mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.fv4it.mongodb.net/?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://1-mathmath33:almbiivi123'+'@atlascluster.miyhqef.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster').then(console.log("DB connected"))
//mongoose.connect('mongodb+srv://1-mathmath33:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.fv4it.mongodb.net/?retryWrites=true&w=majority');
const app=express(); //spins up an express application which allows us to use all kinds of utility and method
// app.use( (req,res,next)=>{  //all the requests and responses have to pass through our app and the next parameter allows us to pass them to the next middleware to be processed/executed
//     res.status(200).json({
//         message: "works"
//     })
//} )

//testing some changes here




app.use(morgan('dev'));  //use it in the express application before handling routes
app.use(bodyParser.urlencoded({ extended: false })); //use it after logging(morgan) - extended supports boolean data, true means that it can parse
                                                     // extended bodies that contain rich data in it, and false means that it can only parse simple bodies
app.use(bodyParser.json()); //allows the parsing of JSON data

//Routes which should handle requests

app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", '*') 
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization') 
    if(req.method === "OPTIONS") { 
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
    next(); 
});

app.use('/products', productRoutes)

app.use('/orders', orderRoutes)

app.use((req,res,next)=>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
})
//error status 500 : internal server error

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    {
        res.json({
            error:
            {
                message: error.message
            }
        })
    }
})
app.use((req, res, next) => { //setting CORS headers before handling routes, these do not send a response, but rather modify it, so that whenever we send a response, it has these headers
    res.header("Access-Control-Allow-Origin", '*') //(Initially it was Not-Allowed but now we set it to Allowed, these headers need a value so we give * as a value so that all the URLs are allowed - you could also give https://devsoc.club but typically RESTful APIs allow all the URLs to have access!)
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //these are some of the default headers than need to be added in order to avoid the CORS error, you can read about each one of them online
    if(req.method === "OPTIONS") { //whenever you send a GET, DELETE, PATCH, POST, or a PUT request, the browser always responds with an OPTIONS method which is inevitable, thus, to overcome this, we set a custom header for this too
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
    next(); //to end our middleware if we're not returning immediately due to receiving the OPTIONS request so that the other routes can't take over
});
module.exports=app; // lets us use our app anywhere else in the backend
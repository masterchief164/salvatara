const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data sanitization against NoSql query injection
app.use(mongoSanitize());

app.get("/",(req,res) =>{
    res.status(200).json({
        status:true,
        msg:"working...",
    })
})


//routers
// const userRouter = require("./routes/userRoute")
const galleryRouter = require('./routes/galleryRoutes')


// router middlewares
// app.use("/user",userRouter)
app.use('/gallery',galleryRouter)

// to handled unregister endpoint
app.all('*',(req,res,next) =>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);

module.exports = app;
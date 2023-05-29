require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());

// express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
// for more information - https://masteringjs.io/tutorials/express/express-json
app.use(express.json());

app.use('/', require("./routes/"));

mongoose.connection.once('open', () => {
    app.listen(PORT, (err) => {
        if(err) {
            console.log(`Error while running server - ${err}`);
            return;
        }
        console.log(`Server is running on port ${PORT}`);
    })
    console.log("Connected to MONGODB database");
})

mongoose.connection.on('error', (err) => {
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running.",
        err
      );  
})
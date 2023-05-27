require('dotenv').config();

const express = require('express');
const app = express();

const port = 3500;



app.get('/', (req, res) => {
    return res.send('<h1>Hello From Server</h1>')
})

app.listen(port, (err) => {
    if(err) {
        console.log(`Error while running server - ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})

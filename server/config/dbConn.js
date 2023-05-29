const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.DATABASE_URI);
        await mongoose.connect("mongodb+srv://kevalradadiya:keval9825@keval.vtevm6a.mongodb.net/empReviewSystem");
        console.log("connected to database");
    } catch (err) { 
        console.log(`Error while connecting to database - ${err}`)
    }
}

module.exports = connectDB;
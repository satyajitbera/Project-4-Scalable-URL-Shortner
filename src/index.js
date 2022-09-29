const express = require('express');
const route = require('./routes/route.js');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://Amaryadav7878:XW9jCVVJDRcwcBR4@cluster0.wpi75.mongodb.net/group36Database-db?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
app.use('/', route);

app.listen((process.env.PORT || 3000 ), function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000 ))
})


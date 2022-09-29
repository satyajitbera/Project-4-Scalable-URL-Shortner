const express = require('express');
const route = require('./routes/route.js');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://matheenahamad:9TNGWEhzUB0Ttemi@matheen.vtdepfw.mongodb.net/group57Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
app.use('/', route);

app.listen((process.env.PORT || 3000 ), function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000 ))
})


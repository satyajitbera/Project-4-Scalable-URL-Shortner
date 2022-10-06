const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
    
mongoose.connect("mongodb+srv://Amaryadav7878:XW9jCVVJDRcwcBR4@cluster0.wpi75.mongodb.net/group36Database-db?retryWrites=true&w=majority",
    { useNewUrlParser: true }
)
    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on PORT" + " " + (process.env.PORT || 3000))
})

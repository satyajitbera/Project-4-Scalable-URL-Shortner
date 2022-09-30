const mongoose = require("mongoose")

const URLSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
},{ timestamps: true })


module.exports = mongoose.model('URL', URLSchema)

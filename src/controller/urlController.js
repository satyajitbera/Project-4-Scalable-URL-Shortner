const urlModel = require('../model/urlModel')
const validUrl = require('valid-url')
const shortid = require('shortid')

const baseUrl = "http://localhost:3000/"
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
    13406,
    "redis-13406.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("vrKvqADStxNAcnU3Kv8jAz9p40rUY0GV", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

//------------------------------------------------------------common Validation-------------------------------------------------------//
const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    if (typeof value == "number") return false;
    return true;
}

//<=================================================== Create URL API===================================================================>

const createURL = async function (req, res) {
    try {
        let data = req.body
        const longUrl = data.longUrl
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Please Provide data" })

        if (!isValid(longUrl))
            return res.status(400).send({ status: false, message: "Please provide URL" })

        if (!validUrl.isWebUri(longUrl))
            return res.status(400).send({ status: false, message: "Please provide valid URL" })


        let uniqueUrl = await urlModel.findOne({ longUrl: longUrl })

        if (uniqueUrl) return res.status(200).send({ status: true, message: "URL already shortened" })

        const urlCode = shortid.generate()
        let alreadyURl = await urlModel.findOne({ urlCode: urlCode })
        if (alreadyURl) return res.status(409).send({ status: true, message: "URL already exist" })

        let shortUrl = baseUrl + urlCode
        let Data = {
            "longUrl": longUrl,
            "shortUrl": shortUrl,
            "urlCode": urlCode
        }

        let createUrl = await urlModel.create(Data)
        res.status(201).send({ status: true, message: "URL shortened Successfully", data: Data })

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

//<=================================================== Get URL API===================================================================>

const getUrl = async function (req, res) {
    try {


        const urlCode = req.params.urlCode;
        let cachedData = await GET_ASYNC(`${urlCode}`)
        console.log(cachedData)
        cachedData = JSON.parse(cachedData)
        if (cachedData) {
            res.status(302).redirect(cachedData)
        }
        else {
            let findURL = await urlModel.findOne({ urlCode: urlCode })
            if (!findURL) return res.status(404).send({ status: false, message: "No URL Found" })
            await SET_ASYNC(`${urlCode}`, JSON.stringify(findURL.longUrl))
            return res.status(302).redirect(findURL.longUrl)
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};



module.exports = { createURL, getUrl }

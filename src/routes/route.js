const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')


//<-------------------- Create URL API ---------------------------->
router.post("/url/shorten", urlController.createURL)


//<-------------------- GET URL API ---------------------------->
router.get("/:urlCode", urlController.getUrl)


module.exports = router
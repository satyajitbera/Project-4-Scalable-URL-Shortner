const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')


//<-------------------- Create URL API ---------------------------->
router.post("/url/shorten", urlController.createURL)


//<-------------------- GET URL API ---------------------------->
router.get("/:urlCode", urlController.getUrl)

router.all("/*/",async function(req, res){
    return res.status(404).send({status:false, message: "page not found"})
})


module.exports = router
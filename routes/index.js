const express = require("express")
const router = express.Router()
//data service
const service = require("../services")


router.get("/getDriveSettings", async function(req, res) {
    try {
        const entities = await service.getDriveSettings()
        JSON.stringify(entities)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(entities)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})



router.post("/setDriveSettings", async function(req, res) {
    try {
        const json = await req.json
        console.log(json)
        await service.setDriveSettings(req.body)
        res.sendStatus(200)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }

})

module.exports = router
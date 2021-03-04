const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.json())

const result = {}

app.get("/", (req, res) => {
    res.send(result)
})

app.post("/", (req, res) => {
    if (!req.body.answer) {
        return res.status(400).send("Bad request")
    } else {
        if (result[req.body.answer] !== undefined) {
            result[req.body.answer] = result[req.body.answer] + 1
        } else {
            result[req.body.answer] = 1
        }
    }
    return res.status(200).send("Ok")
})

app.listen(80, () => {
    console.log("listeing on 80")
})
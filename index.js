const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const bodyParser = require("body-parser")
const fs = require("fs")
const cors = require("cors")

app.use(bodyParser.json())
var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true)

    }
}

// Then pass them to cors:
app.use(cors(corsOptions));

const dr = {
    'Kebabnorsk': 15,
    'Nordlending': 29,
    'Teknikksjef fra stavanger': 78
}

const du = {
    'Manussjef': 43,
    'Finmark': 36,
    'Bergen': 21
}

const vr = {
    'Be om gratis revy': 99,
    'Hjelpe bestemor': 34,
    'Levere mat': 46
}

const vu = {
    'Koke øving': 24,
    'Spise pizza': 17,
    'Gjemme seg for HS': 59
}

app.get("/", (req, res) => {
    res.send(result)
})

app.get("/top3", (req, res) => {
    const re = [0, 0, 0]
    for (let i = 0; i < Object.keys(result).length; i++) {
        const l = Object.keys(result)
        const v = result[l]
        console.log(l, v)
    }
    res.send("k")
})

app.get("/results", (req, res) => {
    res.writeHead(200, { "content-type": "text/html" })
    fs.createReadStream("index.html").pipe(res)
})

app.post("/dr", (req, res) => {
    if (dr[req.body.answer] !== undefined) {
        try {
            dr[req.body.answer] = dr[req.body.answer] + 1
        } catch (err) {
            return res.status(400).send("Bad request")
        }
        res.send("Ok")
    } else {
        res.status(400).send("Bad request")
    }
})

app.post("/du", (req, res) => {
    if (du[req.body.answer] !== undefined) {
        try {
            du[req.body.answer] = du[req.body.answer] + 1
        } catch (err) {
            return res.status(400).send("Bad request")
        }
        res.send("Ok")
    } else {
        res.status(400).send("Bad request")
    }
})

app.post("/vr", (req, res) => {
    if (vr[req.body.answer] !== undefined) {
        try {
            vr[req.body.answer] = vr[req.body.answer] + 1
        } catch (err) {
            return res.status(400).send("Bad request")
        }
        res.send("Ok")
    } else {
        res.status(400).send("Bad request")
    }
})

app.post("/vu", (req, res) => {
    if (vu[req.body.answer] !== undefined) {

        try {
            vu[req.body.answer] = vu[req.body.answer] + 1
        } catch (err) {
            return res.status(400).send("Bad request")
        }
        res.send("Ok")
    } else {
        res.status(400).send("Bad request")
    }
})

app.get("/all", (req, res) => {
    res.send({
        dr,
        du,
        vu,
        vr
    })
})

app.get("/dr", (req, res) => {
    const keys = Object.keys(dr)
    const t = []
    // Create items array
    let total = 0
    var items = Object.keys(dr).map(function (key) {
        total += dr[key]
        return [key, dr[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    res.send({ items, total })
})

app.get("/du", (req, res) => {
    const keys = Object.keys(du)
    const t = []
    // Create items array
    let total = 0
    var items = Object.keys(du).map(function (key) {
        total += du[key]
        return [key, du[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    res.send({ items, total })
})

app.get("/vr", (req, res) => {

    // Create items array
    let total = 0
    var items = Object.keys(vr).map(function (key) {
        total += vr[key]
        return [key, vr[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    res.send({ items, total })
})

app.get("/vu", (req, res) => {


    // Create items array
    let total = 0
    var items = Object.keys(vu).map(function (key) {
        total += vu[key]
        return [key, vu[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    res.send({ items, total })
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

server.listen(process.env.PORT || 3000, () => {
    console.log(`listeing on  ${process.env.PORT || 3000}`)
})
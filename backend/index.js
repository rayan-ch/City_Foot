require("dotenv").config()
const express = require("express")
const bp = require("body-parser")
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.post()

app.listen(PORT, () => {
    console.log(`Port : ${PORT}`)
})
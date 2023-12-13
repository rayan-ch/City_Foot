require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const cors = require("cors")

app.use(express.json())
app.use(cors({
    "origin" : "http://localhost:3000"
}))

app.post(("/login"), (req, res) => {
    let data = res.body
    res.send({"error":0, "msg":"Username or password incorrect"})
})

app.listen(PORT, () => {
    console.log(`Port : ${PORT}`)
})
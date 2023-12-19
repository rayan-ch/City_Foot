require("dotenv").config()
const express = require("express")
const app = express()
const mysql = require('mysql')
const PORT = process.env.PORT || 5000
const cors = require("cors")

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', //If you have set xampp password please enter it here
    database: 'city_foot',
})

app.use(express.json())
app.use(cors({
    "origin" : "http://localhost:3000"
}))

function checkValidity(username, email) {
    return new Promise((resolve, reject) => {
        if (((username || email) === "") || ((username || email) == null) || username.includes(" ")) {
            reject({"error": -1, "msg": "EMAIL_USERNAME_INVALID"});
        } else {
            db.query(`SELECT id FROM users WHERE username = ? OR email = ?`, [username, email], (err, results) => {
                if (err) {
                    reject({"error": -1, "msg": "CONTACT_ADMIN_FOR_INFO"});
                } else if (results.length === 0) {
                    resolve({"error": 0, "msg": "AVAILABLE"});
                } else {
                    resolve({"error": 1, "msg": "ALREADY_EXIST"});
                }
            });
        }
    });
}

app.post("/login", (req, res) => {
    let data = req.body
    db.query("SELECT * FROM users WHERE username = ? && password = ?", [data.username, data.password], (err, results) => {
        if(err) {
            res.send({"error":-1, "msg":"CONTACT_ADMIN_FOR_INFO"})
            console.log(err)
        }
        if(results.length > 0) {
            res.send({"error":0, "msg":results})
        } else {
            res.send({"error":1, "msg":"USERNAME_PASSWORD_INCORRECT"})
        }
    })
})

app.post("/sign-up", (req, res) => {
    let data = req.body
    checkValidity(data.username, data.email)
    .then(result => {
        if (result["error"] === 0) {
            db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [data.username, data.email, data.password], (err, results) => {
                if(err) {
                    res.send({"error":-1, "msg":"CONTACT_ADMIN_FOR_INFO"})
                }
                res.send({"error":0, "msg":"ACCOUNT_CREATED"})
            })
        } else {
            res.send({"error":1, "msg":result["msg"]})
        }
    })
    .catch(error => console.error(error));
})

app.post("/checkValidity", (req, res) => {
    let data = req.body
    db.query(`SELECT id FROM users WHERE ${data.name} = ?`, [data.value], (err, results) => {
        if(err) {
            res.send({"error":-1, "msg":"CONTACT_ADMIN_FOR_INFO"})
            console.log(err)
        }
        if(results.length == 0) {
            res.send({"error":0, "msg":"AVAILABLE"})
        } else{
            res.send({"error":1, "msg":"ALREADY_EXIST"})
        }
    })
})


app.listen(PORT, () => {
    console.log(`Port : ${PORT}`)
})
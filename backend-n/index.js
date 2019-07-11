var express = require("express");
var cors = require("cors")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

var app = express();
app.use(cors())
db.defaults({ user: [], count: 0 })
  .write()

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/login", (req, res, next) => {
    console.log(req.query)
    db.get('user')
    .push({ access_token: req.query.access_token, state: req.query.state, username: req.query.username, used: 'false'})
    .write()
    db.update('count', n => n + 1)
    .write()
    // on receive save user details
})
// Update access token here as well.
app.get("/updatelogin", (req, res, next) => {
    console.log(req.query)
    db.get('user')
    .push({ access_token: req.query.access_token, state: req.query.state, username: req.query.username, used: 'false'})
    .write()
    db.update('count', n => n + 1)
    .write()
    // on receive save user details
})
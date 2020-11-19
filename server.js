// load required packages
const express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var admin = require("firebase-admin");
var serviceAccount = require("./node-firebase-intro-a5e63-firebase-adminsdk-pmsf1-a8bec1deb0.json");

// var firebaseAdmin = admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://node-firebase-intro-a5e63.firebaseio.com",
// });

// // database
// const db = admin.firestore();

// // create authentication middleware
// function isAuthenticated(req, res, next) {
// 	//check if user is logged in
// 	// if they are attatch them the request object and call next
// 	// if not send them to the login page
// 	// with message saying "login!"
// }

// create instance of express app
const app = express();

app.set("view engine", "ejs"); // serve js and html together using ejs
app.set("views", __dirname + "/views");

app.use(express.static("views")); // send css, images and other static content/files

app.use(bodyParser.json()); // give server access to user input
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));

// route to HOME page
app.get("/", function (req, res) {
	res.render("home.ejs");
});

app.get("/user", function (req, res) {
	res.render("user.ejs");
});

app.get("/form", function (req, res) {
	res.render("form.ejs");
});

// app.get("/resume", function (req, res) {
// 	res.render("resume.ejs");
// });

app.get("/*", function (req, res) {
	res.render("404.ejs");
});

// post request for home route
app.post("/", function (req, res) {});

// app.post("/form", function (req, res) {
// 	// sends data from form to firestore database
// 	db.collection("resumes").add(req.body);

// 	// console.log(req.body);
// });

// assigned port number
const port = 3000;

app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});

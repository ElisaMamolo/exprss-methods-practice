//query and route parameters intro
//Its main purpose is to send very small pieces of information from the client to the server.
// This information is being sent via URL.

//A query parameter (aka query string) is the portion of a URL after the ? (question mark). Example:
//https://github.com/sandrabosk?tab=repositories
//To access it, we would have to use the following pattern:
/*
router.get('/', (req, res) => {
  console.log(req.query.tab);
});

//another way is using route parameters
https://github.com/sandrabosk
https://github.com/Tzikas
//To access the portion that holds a specific username (sandrabosk, Tzikas), we would have to follow this pattern:
router.get('/:user', (req, res) => {
  console.log(req.params.user);
});
*/

const express = require("express");
const app = express();
const hbs = require("hbs");

//specify that we are going to have middelwares
app.use(myFakeMiddleware);
//We pass next as our third argument, then whenever our middleware is done logging, we call it.

function myFakeMiddleware(req, res, next) {
  console.log("myFakeMiddleware was called!");
  req.secretValue = "swordfish";
  next();
}

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

/* some examples of request parameters
app.get("/users/:username", (req, res) => {
  console.log(req.params);
  //req.params => is an object containing the user value and key sent by url
});

app.get("/books/:bookId", (req, res, next) => {
  res.send(req.params);
});

app.get("/users/:username/books/:bookId", (req, res, next) => {
  res.send(req.params);
});
how github has a single route for all repos
app.get('/:repository', (req, res, next) => {

});
*/

/*Query String -> send params on the URL as a string
//the query string is the part of a URL after the question
//mark ? and usually contains key-value pairs separated
//by & and =. These key/value pairs can be used by the server
//as arguments to query a database, or maybe to filter results

app.get("/search", (req, res, next) => {
  res.send(req.query);
});
*/

//The form action is /search, means that when we click on the
//SEARCH button, we will make a GET request to /search route

//On each input, what we put in the name field will be each of
//the keys on the req.query object, and what’s on the input will be the value.
app.get("/search", (req, res, next) => {
  res.send(req.query);
});

app.get("/", (req, res, next) => {
  res.render("index");
});

//route for getting user info
app.get("/get-user-info", (req, res) => {
  res.render("user-info-form");
});

//route for showing user info
app.get("/display-user-info", (req, res) => {
  // const name = req.query.name;
  // const age = req.query.age;
  // const superhero = req.query.superhero;

  // the same as 3 lines above
  //using object decostructuring
  const { name, age, superhero } = req.query;

  res.send(`
    Your name is ${name}
    Your age is ${age}
    Your favorite superhero is ${superhero}
  `);
});

/*POST FLOW 
st=>start: Show the user a form
op=>operation: User types login info into form
op2=>operation: User hits enter
op3=>operation: Form does POST request
op4=>operation: Server tries to login User
op4=>operation: User is redirected (to a home page, newsfeed, etc)
e=>end: End

st->op->op2->op3->op4->end
*/

//to access post data we need the body parser (part of express so no install) but
// 1. require the body-parser
const bodyParser = require("body-parser");
// 2. let know your app you will be using it
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res) => res.render("login"));

app.post("/login", (req, res) => {
  console.log("Login form submitted!");
  const { email, password } = req.body;
  //res.send(`Email: ${email}, Password: ${password}`);
  if (email.length > 0) {
    // render "Welcome"
    res.send(`Welcome`);
  } else {
    console.log("failed");
    res.render("login");
  }
});

//route for using middleware (only example)
app.get("/test", (req, res) => {
  let mySecret = req.secretValue;
  res.send(mySecret);
});

app.listen(3000, () => console.log("App listening on port 3000!"));

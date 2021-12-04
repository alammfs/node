const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const session = require('express-session');

const app = express();

// any UI application which wants to use the api of this server should be run on localhost and a port 8081
var corsOptions = {
  origin: "http://localhost:8081"
};

// Express v4.16.0 and higher
// --------------------------
// const express = require('express');

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));

// // For Express version less than 4.16.0
// // ------------------------------------
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// session middleware: http://expressjs.com/en/resources/middleware/session.html
var sess = {
  name : 'JSESSIONID',
  genid: function(req) {
    return (new Date()).getTime().toString(36); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  maxAge: 3600000 ,  // 1 hour (in milliseconds)
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  if(req.session.page_views){
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
 } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
 }
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const path = require("path");

// import routing
const mainRoute = require("./routes/main");

// import middleware
const parse = require("./middlewares/parsing");

const app = express();

// set template engine
app.set("view engine", "ejs");
app.set("views", "views");

// parsing body/file and expose public dir
app.use(parse.bodyJsonHandler);
app.use(parse.bodyParserHandler);
app.use(express.static(path.join(path.dirname(process.mainModule.filename), "public")));

// routing request
app.use(mainRoute);

const server = app.listen(8080);
const io = require("./socket").init(server);

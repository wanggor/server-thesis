const bodyParser = require("body-parser");
const multer = require("multer");

exports.bodyParserHandler = bodyParser.urlencoded({ extended: false });
exports.bodyJsonHandler = bodyParser.json();

const serialPort = require("serialport");
const serial = require("../serial");

serial.init();

exports.home = (req, res, next) => {
  res.render("home", {
    pageTitle: "Home",
  });
};

exports.run = (req, res, next) => {
  res.status(200).json({ data: "hello" });
};

exports.refresh = (req, res, next) => {
  res.status(200).json({ data: "hello" });
};

exports.refresh_port = async (req, res, next) => {
  var ports = [];

  try {
    ports = await serialPort.list();
    res.status(200).json({ data: ports.map((e) => e.path) });
  } catch (error) {
    res.status(500).json({ data: portsList });
  }
};

exports.connect = async (req, res, next) => {
  if (req.body.port) {
    const port = req.body.port;
    try {
      await serial.connect(port);
      connected = await serial.isConnect();
      if (connected) {
        res.status(200).json({ data: true, port: port });
      } else {
        res.status(200).json({ data: false });
      }
    } catch (error) {
      res.status(200).json({ data: false });
    }
  } else {
    res.status(200).json({ data: false });
  }
};

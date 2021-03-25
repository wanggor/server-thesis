const SerialPort = require("serialport");

let serial;

module.exports = {
  init: () => {
    isSendingReceive = false;
  },

  buildConnect: () => {
    serial = new SerialPort(port, {
      baudRate: 9600,
    });
    this.isSendingReceive = false;
  },
  connect: async (port) => {
    if (serial) {
      if (self.serialPort.isOpen) {
        await serial.close();
        this.buildConnect();
      }
    } else {
      this.buildConnect();
    }
  },
  send: async (res, text) => {
    if (this.isSendingReceive) {
      res.status(500).json({ data: "" });
    } else {
      this.isSendingReceive = true;
      isSend = await serial.write(text);
      serial.off("data");

      var buffer = "";
      serial.on("data", function (chunk) {
        buffer += chunk;
        var answers = buffer.split(/\r?\n/);
        buffer = answers.pop();

        if (answer.length > 0) {
          res.status(200).json({ data: answer[0] });
          this.isSendingReceive = false;
        }
        this.isSendingReceive = false;
      });
    }
  },
};

const SerialPort = require("serialport");

let serial;

module.exports = {
  init: () => {
    isSendingReceive = false;
  },

  buildConnect: async () => {
    serial = new SerialPort(port, {
      baudRate: 9600,
    });
    this.isSendingReceive = false;
  },
  isConnect : async () => {
    if (serial) {
      return serial.isOpen
    }else{
      return false
    }
  },
  connect: async (port) => {
    if (serial) {
      if (serial.isOpen) {
        await serial.close();
        serial = new SerialPort(
          port,
          {
            baudRate: 9600,
          },
          function (err) {
            if (err) {
              return console.log("Error: ", err.message);
            } else {
              return console.log("OK");
            }
          }
        );
        this.isSendingReceive = false;
      }
    } else {
      serial = new SerialPort(
        port,
        {
          baudRate: 9600,
        },
        function (err) {
          if (err) {
            return console.log("Error: ", err.message);
          } else {
            return console.log("OK");
          }
        }
      );
      this.isSendingReceive = false;
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

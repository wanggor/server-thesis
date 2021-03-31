const { text } = require("body-parser");
const SerialPort = require("serialport");

const io = require("./socket");

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
              io.getIO().emit("error", {
                error : "Error: " + err.message
              });
              return console.log("Error: ", err.message);
            } else {
              io.getIO().emit("port", {
                port : port
              });
              return console.log("OK");

            }
          }
        );
        this.isSendingReceive = false;
      }else{
        serial = new SerialPort(
          port,
          {
            baudRate: 9600,
          },
          function (err) {
            if (err) {
              io.getIO().emit("error", {
                error : "Error: " + err.message
              });
              return console.log("Error: ", err.message);
            } else {
              io.getIO().emit("port", {
                port : port
              });
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
            io.getIO().emit("error", {
              error : "Error: " + err.message
            });
            return console.log("Error: ", err.message);
          } else {
            io.getIO().emit("port", {
              port : port
            });
            return console.log("OK");
          }
        }
      );
      this.isSendingReceive = false;
    }
  },
  sendMultiple: async (res, data) => {
      try {
        this.isSendingReceive = true;
        sendingText = []
        let text;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          text = "morun " + (index+1) + " 0" + " " +element.frequency + " " + element.duration + "\n";
          console.log(text)
          isSend = await serial.write(text);
          sendingText.push(text)
        }
        res.status(200).json({ data: sendingText });
        this.isSendingReceive = false;
      } catch (error) {
        console.log(error)
        this.isSendingReceive = false;
      }
      
      // var buffer = "";
      // serial.on("data", function (chunk) {
      //   buffer += chunk;
      //   var answers = buffer.split(/\r?\n/);
      //   buffer = answers.pop();

      //   if (answer.length > 0) {
      //     res.status(200).json({ data: answer[0] });
      //     this.isSendingReceive = false;
      //   }
      //   this.isSendingReceive = false;
      // });
  
  },
};

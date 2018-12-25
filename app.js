var express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);

var SerialPort = require("serialport")
var serialPort = new SerialPort("/dev/cu.usbmodem14111", {
    baudRate: 115200
});

server.listen(8080);

app.use(express.static('public'));

var brightness = 0;
let ledId;


io.sockets.on('connection', function (socket) {
    socket.on('led', function (data) {
        brightness = data.value;
        ledId = data.id;

        /* let currentValue = serialPort.read();

        console.log(currentValue); */

        var buf1 = new Buffer(1);
        buf1.writeUInt8(ledId, 0);
        serialPort.write(buf1);

        var buf2 = new Buffer(1);
        buf2.writeUInt8(brightness, 0);
        serialPort.write(buf2);

        /*   var buf = new Buffer(1);
          buf.writeUInt8(6, 0);
          serialPort.write(buf);
  
          buf.writeUInt8(6, 0);
          serialPort.write(buf); */

        io.sockets.emit('led', { id: ledId, value: brightness });
    });

    socket.emit('led', { id: 10, value: brightness });
    //  socket.emit('led', { id: 6, value: brightness });
    socket.emit('led', { id: 3, value: brightness });
});




serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function (data) {
        console.log('Data:', data);
    });

    serialPort.on('readable', function () {
        console.log('Data:', port.read());
    });
});


app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/public/app.html');
})

console.log("running");
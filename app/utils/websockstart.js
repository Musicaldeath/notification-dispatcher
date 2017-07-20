var socketIo = require('socket.io');

let init = ( server ) => {

  socketIo = socketIo( server );
  socketIo.on('connection', ( socket ) => {

    console.log( "CONNECTED !");

  });
};

module.exports = {
  init: init
};

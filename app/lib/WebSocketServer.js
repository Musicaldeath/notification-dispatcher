var socketIo = require('socket.io');

/*****************************************************/
let registerEvent = ( socket, eventName, fn ) => {
  socket.on( eventName, fn );
};

let getConnection = ( videoId, array ) => {
  array.forEach( ( conn ) => {
    if( conn.videoId === video ) return conn;
  });
};
/*****************************************************/
            //******-----CLASS-----******//
/*****************************************************/

class WebSocketServer {

  constructor() {
      this.connections = [];
      this.io = {};
  }

  /*****************************************************/
  init( server ) {
    this.io = socketIo( server );
    this.io.on('connection', ( socket ) => {

      registerEvent( socket, 'Subscribe', this.subscribeFn );
      registerEvent( socket, 'Unsubscribe', this.unsubscribeFn );

    });

    return server;
  }

  /*****************************************************/
  subscribeFn( data ) {
    var conn = getConnection( data.videoId, this.connections );
    if( conn === undefined ) this.connections.push( { videoId: data.videoId, sockets: [ socket ] } );
    else {
      if( conn.sockets[socket] !== undefined )
        conn.sockets.push( socket );
    }
    console.log( data );
  }

  unsubscribeFn( data ) {
    var conn = getConnection( data.videoId, this.connections );
    if( conn === undefined ) socket.emit('NoSubscriptions', "No subscriptions for this video");
    if( conn.sockets[sock] === undefined ) socket.emit( 'UserNotRegistered',  'User socket not subscribed this notification feed');

    conn.sockets.splice( socket, 1 );
    console.log( data );
  }
  /*****************************************************/
  pushMessage( videoId, msg ) {
    this.connections.forEach( ( conn ) => {
      if( conn.videoId === videoId ) {
        conn.sockets.forEach( ( sock ) => {
          sock.emit( "AuctionNotification", msg );
        });
      }
    });
  }
  /*****************************************************/
  /*****************************************************/

};
/****************    END CLASS   ***********************/

module.exports = WebSocketServer;

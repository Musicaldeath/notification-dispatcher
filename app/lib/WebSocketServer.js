var socketIo = require('socket.io');

/*****************************************************/
var registerEvent = ( socket, eventName, fn ) => {
  socket.on( eventName, fn );
};

var getConnection = ( videoId, arr ) => {
  arr.forEach( ( conn ) => {
    if( conn.videoId === video ) return conn;
  });
};

class WebSocketServer {

  constructor() {
      this.connections = [];
      this.io = {};
  }

  init( server ) {
    this.io = socketIo( server );
    this.io.on('connection', ( socket ) => {

      registerEvent( socket, 'Subscribe', this.subscribeFn( this.connections ) );
      registerEvent( socket, 'Unsubscribe', this.unsubscribeFn );

    });
  }

  subscribeFn( connections ) {

    return function( data ) {
      var conn = getConnection( data.videoId, connections || [] );
      if( conn === undefined ) connections.push( { videoId: data.videoId, sockets: [ this ] } );
      else {
        if( conn.sockets[this] === undefined )
          conn.sockets.push( this );
      }
      console.log( data );
    };
  }

  unsubscribeFn( data ) {
    var sock = this;
    var conn = getConnection( data.videoId, this.connections || [] );
    if( conn === undefined ) this.emit('NoSubscriptions', "No subscriptions for this video");
    if( conn.sockets[sock] === undefined ) this.emit( 'UserNotRegistered',  'User socket not subscribed this notification feed');

    conn.sockets.splice( this, 1 );
    console.log( data );
  }

  pushMessage( videoId, msg ) {
    this.connections.forEach( ( conn ) => {
      if( conn.videoId === videoId ) {
        conn.sockets.forEach( ( sock ) => {
          sock.emit( "AuctionNotification", msg );
        });
      }
    });
  }

};
/****************    END CLASS   ***********************/

module.exports = WebSocketServer;

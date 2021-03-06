var socketIo = require('socket.io');

/*****************************************************/
var registerEvent = ( socket, eventName, fn ) => {
  socket.on( eventName, fn );
};

//ne semble pas bien fonctionner... ne retourne pas l'objet
var getConnection = ( videoId, arr ) => {
  arr.forEach( ( conn ) => {
    if( conn.videoId === videoId ) return conn;
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
      registerEvent( socket, 'Unsubscribe', this.unsubscribeFn( this.connections ) );

    });
  }

  subscribeFn( connections ) {
    return function( data ) {
      this.join( data.videoId );
      /*var conn = getConnection( data.videoId, connections );
      if( conn === undefined ) connections.push( { videoId: data.videoId, sockets: [ this ] } );
      else {
        if( conn.sockets[this] === undefined )
          conn.sockets.push( this );
      }
      console.log( connections );*/
    };
  }

  unsubscribeFn( connections ) {
    return function( data ) {
      this.leave( data.videoId );
    };

    /*return function( data ) {
      var sock = this;
      var conn = getConnection( data.videoId, connections );
      if( conn === undefined ) this.emit('NoSubscriptions', "No subscriptions for this video");
      else if( conn.sockets[sock] === undefined ) this.emit( 'UserNotRegistered',  'User socket not subscribed this notification feed');
      else {
        conn.sockets.splice( sock, 1 );
      }
      console.log( connections );
    };*/
  }

  pushMessage( videoId, msg ) {
    this.io.in( videoId ).emit( 'AuctionUpdate', msg );
    /*this.connections.forEach( ( conn ) => {
      if( conn.videoId === videoId ) {
        conn.sockets.forEach( ( sock ) => {
          sock.emit( "AuctionNotification", msg );
        });
      }
    });*/
  }

};
/****************    END CLASS   ***********************/

module.exports = WebSocketServer;

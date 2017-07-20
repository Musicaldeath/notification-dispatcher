var socketIo = require('socket.io');

/*****************************************************/
let subscribeFn = ( data, getConnection ) => {
  return function( data ) {
    var conn = getConnection( data.videoId );
    if( conn === undefined ) this.connections.push( { videoId: data.videoId, sockets: [ socket ] } );
    else {
      if( conn.sockets[socket] !== undefined )
        conn.sockets.push( socket );
    }
    console.log( data );
  };
};
/*****************************************************/
let unsubscribeFn = ( data, getConnection ) => {

  return function( data ) {
    var conn = getConnectionFor( data.videoId );
    if( conn === undefined ) socket.emit('NoSubscriptions', "No subscriptions for this video");
    if( conn.sockets[sock] === undefined ) socket.emit( 'UserNotRegistered',  'User socket not subscribed this notification feed');

    conn.sockets.splice( socket, 1 );
    console.log( data );
  };
};

let registerEvent = ( socket, eventName, fn ) => {
  socket.on( eventName, fn );
};

let getConnectionFor = ( videoId, connections ) => {
  connections.forEach( ( conn ) => {
    if( conn.videoId === video ) return conn;
  });
};
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

      var subscribeFnBuild = (( data, getConnection )=> {
        return subscribeFn( data, getConnection );
      })( getConnection );

      var unsubscribeFnBuild = (( data, getConnection )=>{
        return unsubscribeFn( data, getConnection );
      })( getConnection );

      registerEvent( socket, 'Subscribe', subscribeFnBuild );
      registerEvent( socket, 'Unsubscribe', unsubscribeFnBuild );

    });

    return server;
  };
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
  getConnection( videoId ) {
    return getConnectionFor( videoId, this.connections );
  }
  /*****************************************************/

};
/****************    END CLASS   ***********************/

module.exports = WebSocketServer;

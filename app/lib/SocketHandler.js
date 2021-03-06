
var server = require('http').createServer(  );
var io = require('socket.io')(server);
io.set('origins', '*:*');

let init = () =>{

  io.on('connection', ( socket ) => {

    registerEvent( socket, 'Subscribe', subscribeFn );
    registerEvent( socket, 'Unsubscribe', unsubscribeFn );

  });
};

let subscribeFn = ( data ) => {
  var conn = getConnection( data.videoId );
  if( conn === undefined ) this.connections.push( { videoId: data.videoId, sockets: [ socket ] } );
  else {
    if( conn.sockets[socket] !== undefined )
      conn.sockets.push( socket );
  }
};

let unsubscribeFn = ( data ) => {
  var conn = getConnection( data.videoId );
  if( conn === undefined ) socket.emit('NoSubscriptions', "No subscriptions for this video");
  if( conn.sockets[sock] === undefined ) socket.emit( 'UserNotRegistered',  'User socket not subscribed this notification feed');

  conn.sockets.splice( socket, 1 );
};


let registerEvent = ( socket, eventName, fn ) => {
  socket.on( eventName, fn );
};

class SocketHandler {

  constructor() {
      this.connections = [];
      init();
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

  getConnection( videoId ) {
    this.connections.forEach( ( conn ) => {
      if( conn.videoId === video ) return conn;
    });
  }



};

module.exports = SocketHandler;

const IO = require('socket.io');
const HTTP = require('http');
const SERVER = HTTP.createServer();

let findNamespace = ( namespace ) => {
  for( var space in this.namespaces ) {
    if( this.namespaces.name === namespace )
      return this.namespaces[ space ];
  }
};

let findSocketInNamespaceByUserEmail = ( namespace, email ) => {
  var ns = findNamespace( namespace );
  for( var conn in ns.connections ) {
    var c = ns.connections[c];
  }
};

class SocketController {

  constructor( port, options ) {
    this.io = IO( port, options );
    this.namespaces = [];
  }

  createNamespaceConnection( namespace, callback ) {

    var space = findNamespace( namespace );
    if( !space ) {
      space.nsp = this.io.of( namespace );
      space.name = namespace;
      space.connections = [];
      this.namespaces.push( space );
      space = this.namespaces[ this.namespaces.length - 1 ];
    }

    space.nsp.on( 'connection', ( socket ) => {

      socket.emit('mail?', (mail) => {
        socket.mail = mail;
        space.connections.push( socket );
        callback( space, socket );
      });

      callback();
    });
  }

  getNamespaces() {
    return this.namespaces;
  }

}

module.exports = SocketController;

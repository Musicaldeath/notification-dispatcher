const http = require('http')

class PubSubController {


   constructor( webSocketServer ) {
     this.webSocketServer = webSocketServer;
   }

   init( server ) {
     this.webSocketServer.init( server );
     return this;
   }

   confirmSubscription( subscribeURL ) {
     var request = http.get( subscribeURL );
     request.on('error', ( err ) => { console.error( err ); } );
     request.end();
   }

   notify( amazonSNSNotification ) {
     this.webSocketServer.pushMessage( amazonSNSNotification.videoId, amazonSNSNotification.bidAmount );
   }
};

module.exports = PubSubController;

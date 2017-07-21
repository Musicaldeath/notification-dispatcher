const http = require('http')

class PubSubController {


   constructor( webSocketServer ) {
     this.webSocketServer = webSocketServer;

     this.confirmSubscription = ( subscribeURL ) => {
       var request = http.get( subscribeURL );
       request.on('error', ( err ) => { console.error( err ); } );
       request.end();
     }

     this.notify = ( amazonSNSNotification ) => {
       this.webSocketServer.pushMessage( amazonSNSNotification.videoId, amazonSNSNotification.bidAmount );
     }
   }

   init( server ) {
     this.webSocketServer.init( server );
   }


};

module.exports = PubSubController;

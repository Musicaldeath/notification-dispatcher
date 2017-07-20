const http = require('http')

class PubSubController {


   constructor( socketHandler ) {
     this.socketHandler = socketHandler;
   }

   confirmSubscription( subscribeURL ) {
     var request = http.get( subscribeURL );
     request.on('error', ( err ) => { console.error( err ); } );
     request.end();
   }

   notify( amazonSNSNotification ) {
     this.socketHandler.pushMessage( amazonSNSNotification.videoId, amazonSNSNotification.bidAmount );
   }
};

module.exports = PubSubController;

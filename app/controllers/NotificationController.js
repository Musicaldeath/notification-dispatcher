const SocketController = require('./SocketController');

const NOTIFICATION = "Notification";
const SUBSCRIBE    = "SubscriptionConfirmation";

/*let subscribeTopic = () => {
  var subscribeLink = this.request.headers.SubscribeURL;
};

let dispatchNotification = () => {
  var msg = this.request.body.message;
  var subject = this.request.body.subject;
};*/

let findTopicByName = ( topicName ) => {
  for( var top in this.topics ) {
    var topic = this.topics[top];
    if( topic.name === topicName )
      return topic;
  }
};

class NotificationController {

  constructor( socketListenerPort ) {
    this.topics = [];
    this.socketController = new SocketController( socketListenerPort || 3001, {
      path: '/auction_notifs',
      serveClient: false
    });
  }

  setTopic( topicName ) {
    this.socketController.createNamespaceConnection( topicName, ( namespace ) => {
      var topic = {
        nsp : namespace.nsp,
        name : namespace.name,
        sockets: namespace.connections
      };
      this.topics.push( topic );
    });
  }

  sendTopicNotification( topicName ) {
    var topic = findTopicByName( topicName );
    topic.nsp.emit('BLABLA');
  }

  updateTopicList() {
    this.topics = this.socketController.getNamespaces();
  }

  setRequest( req ) {
    this.request = req;
  }

  actOnType( msgType, callback ) {
    switch( msgType ) {
      case NOTIFICATION : callback( dispatchNotification() );break;
      case SUBSCRIBE    : callback( subcribeTopic() ); break;
      default : res.status( 400 );
    }
  }
}

module.exports = NotificationController;

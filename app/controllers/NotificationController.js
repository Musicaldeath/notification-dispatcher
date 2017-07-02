const NOTIFICATION = "Notification";
const SUBSCRIBE    = "SubscriptionConfirmation";

let subscribeTopic = () => {

};

let dispatchNotification = () => {

};

class NotificationController {

  constructor() {}

  setRequest( req ) {
    this.request = req;
  }

  actOnType( msgType, req, callback ) {
    switch( msgType ) {
      case NOTIFICATION : dispatchNotification();break;
      case SUBSCRIBE    : subcribeTopic(); break;
      default : res.status( 400 );
    }
  }
}

module.exports = NotificationController;

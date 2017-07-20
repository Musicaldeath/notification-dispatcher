
class AmazonSNSNotification {

  constructor( req ) {
      this.headers = req.headers;
      this.body    = req.body;

      this.type    = this.headers['x-amz-sns-message-type'];
      this.videoId = this.body.Subject;
      this.topicArn = this.body.TopicArn;
      this.bidAmount = this.body.Message;
  }
};

modules.export = AmazonSNSNotification;

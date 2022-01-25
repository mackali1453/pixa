class Messages 
{

  public formatMessage(username:any, text:any) {
    const moment = require('moment');

    return {
      username,
      text,
      time: moment().format('h:mm a')
    };
  }
}


export default Messages
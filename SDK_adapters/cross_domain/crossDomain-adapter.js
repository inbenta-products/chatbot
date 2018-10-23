/**
 * 
 * @param {Object} inputSessionData 
 */
function crossdomain(inputSessionData) {
  return (bot) => {
    var sessionData = {};
    bot.subscriptions.onSendMessage(function(messageData, next) {
      if (messageData.message == "crossdomain") {
        sessionData = bot.actions.getSessionData();
        sessionData = JSON.stringify(sessionData);
        bot.actions.displaySystemMessage({message:'https://awseu-dev01.inbenta.com/bmayolas/bot-sdk/public/adapters-examples/crossdomain.php?data='+encodeURIComponent(sessionData)});
      }else {
        return next(messageData);
      }
    });

    bot.subscriptions.onReady(function(next) {
      if(inputSessionData !== 'fakeData'){
        bot.actions.setSessionData(inputSessionData);
        return next();
      }else {
        bot.actions.displayChatbotMessage({type: 'answer', message:'Write <b>crossdomain</b> in order to get transfered to another domain with the same sessionData'});
        return next();
      }
    });
  };
}

function PostCrossDomain(redirectUrl, sessionData) {
  var systemMessageId;
  function adapter(bot) {
    // Subscription to onSendMessage
    bot.subscriptions.onSendMessage(function(messageData, next) {
      if (messageData.message !== "crossdomain") return next(messageData);
      var systemMessage = {
        message: 'Do you want to move to the other subdomain?',
        options: [
          {
            label: 'Take me there!'
          }
        ]
      };
      systemMessageId = bot.actions.displaySystemMessage(systemMessage);
    });

    // Subscription to onSelectSystemMessageOption
    bot.subscriptions.onSelectSystemMessageOption(function(optionData, next) {
      if (optionData.id !== systemMessageId) return next();

      var sessionData = bot.actions.getSessionData();
      sessionData = JSON.stringify(sessionData);
      var input = document.createElement('input');
      input.type = 'hidden';
      input.value = sessionData;
      input.name = 'sessionData';
      var form = document.createElement('form');
      form.method = 'post';
      form.action = redirectUrl;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    });

    // Subscription to onReady
    bot.subscriptions.onReady(function(next) {
      if(sessionData !== 'fakeData'){
        bot.actions.setSessionData(sessionData);
        return next();
      }else {
        bot.actions.displayChatbotMessage({type: 'answer', message:'Write <b>crossdomain</b> in order to get transfered to another domain with the same sessionData'});
        return next();
      }
    });
  }

  return adapter;
}

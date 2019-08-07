function NLEscalation2(checkAgents) {
  return function(chatBot) {

    let chatIdTracker = {
      value: {
        chatId: '',
        appId: '',
        region: null,
      }
    };
    
    /**
     * Look for escalationOffer directCall attribute, checkAgents and set variable
     * Remove end-form directCall on escalationStart contnet
     * @param  {[Object]}   messageData [MessageData of displayChatbotMessage action]
     * @param  {Function} next        [Callback]
     * @return {[next]}               [next]
     */
    chatBot.subscriptions.onDisplayChatbotMessage(function(messageData, next) {
      //Detect escalationOffer content
      if("attributes" in messageData && messageData.attributes !== null && 'DIRECT_CALL' in messageData.attributes && messageData.attributes.DIRECT_CALL==="escalationOffer"){
        checkAgents().then(function(result) {
          if('agentsAvailable' in result){
            chatBot.api.addVariable('agents_available',result.agentsAvailable.toString());
          }
        });
      //Remove end-form direct-answer on escalationStart, but don't interrupt the action, so js_callback is executed
      }else if('flags' in messageData && messageData.flags.length > 0 && 'actions' in messageData && messageData.actions.length > 0){
        if(messageData.flags.indexOf('end-form')!==-1){
          for (var i = 0; i < messageData.actions.length; i++) {
            if('parameters' in messageData.actions[i] && 'callback' in messageData.actions[i].parameters && messageData.actions[i].parameters.callback == "escalationStart"){
              messageData.message = '';
              messageData.messageList = [];
            }
          }
        }
      }
      return next(messageData);
    });

  
    /**
     * Subcription on setExternalInfo triggered by external chat
     * Look for attended and chatId attributes, perform tracking of attended/unattended
     * @param  {[Object]} escalationData [Attended, chatId, appId and region]
     * @param  {Function} next        [Callback]
     * @return {[next]}               [next]
     */
    chatBot.subscriptions.onSetExternalInfo(function(escalationData, next) {
      if('attended' in escalationData && 'chatId' in escalationData && 'appId' in escalationData && 'region' in escalationData){
        chatIdTracker.value.chatId = escalationData.chatId;
        chatIdTracker.value.appId = escalationData.appId;
        chatIdTracker.value.region = escalationData.region;
        if(escalationData.attended){
          chatBot.api.track('CHAT_ATTENDED', chatIdTracker);
        }else chatBot.api.track('CHAT_UNATTENDED',chatIdTracker);
      }
      return next(escalationData);
    });

    //detect escalationStart action, checkAgents and perform escalationStart directCall
    chatBot.subscriptions.onEscalationStart(function(escalationData, next) {
      checkAgents().then(function(result) {
        if('agentsAvailable' in result){
          chatBot.api.addVariable('agents_available',result.agentsAvailable.toString()).then(function(){
            chatBot.actions.sendMessage({directCall:'escalationStart'});
          });
        }
      });
    });
  };
}
module.exports=NLEscalation2;

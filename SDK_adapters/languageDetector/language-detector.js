function languageDetector() {
    return function(chatbot) {
        var lastUserInput = "";
        chatbot.subscriptions.onCustomTrigger(function(next){
            chatbot.api.languageDetector(lastUserInput).then(function(result){
                if(result.data.language === "es"){
                    chatbot.api.addVariable('different_language_detected',"es").then(function(result){
                        chatbot.actions.sendMessage({directCall:"language-detection-after-no-results"});
                    });
                }
            });
        });
        chatbot.subscriptions.onSendMessage(function(messageData,next){
            if("message" in messageData && messageData.message !== ""){
                lastUserInput = messageData.message;
            }
            return next(messageData);
        });
        /**
         * Remove end-form message 
         * @param  {[Object]}   messageData [MessageData of displaychatbot action]
         * @param  {Function} next        [Callback]
         * @return {[next]}               [next]
         */
        chatbot.subscriptions.onDisplayChatbotMessage(function(messageData, next) {
            if('flags' in messageData && messageData.flags.length > 0 && 'actions' in messageData && messageData.actions.length > 0){
            if(messageData.flags.indexOf('end-form')!==-1){
                for (var i = 0; i < messageData.actions.length; i++) {
                    if('parameters' in messageData.actions[i] && 'callback' in messageData.actions[i].parameters && messageData.actions[i].parameters.callback == "customTrigger"){
                        messageData.message = '';
                        messageData.messageList = [];
                    }
                }
            }
            }
            return next(messageData);
        });
    };
}

var paymentOptions = '<div id="activity">Which payment method do you prefer?:</div>'+
'<div><img class="cash" src="<example_url>" style="width:70px;" />'+
'<img class="credit_card" src="<example_url>"  style="width:70px;" />'+
'<img class="paypal" src="<example_url>"  style="width:70px;"/></div>';

//Initial reservation message
var paymentMethodMessage = {
  message :paymentOptions,
  type: 'customAnswer',
};
//final message after completing the questions
var finalMessage = {
  message :'Thank you, your preference has been saved',
  type: 'answer',
};
var cashListener = '';
var visaListener = '';
var paypalListener = '';

function selectPayment() {
  return function(bot){
    bot.subscriptions.onDisplayChatbotMessage(function(messageData, next) {
      //Interrupt welcomeMessage to show our reservation message
      if( 'flags' in messageData && messageData.flags[0] == "welcome"){
        bot.actions.displayChatbotMessage(paymentMethodMessage);
      }else return next(messageData);
    });
    bot.subscriptions.onReady(function(next) {
      bot.helpers.setListener('.cash', 'elementExists', modifyStyling,bot); 
      bot.helpers.setListener('.credit_card', 'elementExists', modifyStyling,bot);
      bot.helpers.setListener('.paypal', 'elementExists', modifyStyling,bot);
      // Set new click event on this classes, triggering clickPayment function, we will send the chatbotInstance in the extraData parameter.
      cashListener = bot.helpers.setListener('.cash', 'click', clickPayment,bot);
      visaListener = bot.helpers.setListener('.credit_card', 'click', clickPayment,bot);
      paypalListener = bot.helpers.setListener('.paypal', 'click', clickPayment,bot);
    });
  };
} 
//Fix the width of the elements inside conversationWindow message
function modifyStyling(listenerID,targetElement,chatbotInstance){
    targetElement[0].style.width = '70px';
    targetElement[0].style.margin = '5px';
    chatbotInstance.helpers.removeListener(listenerID);
}
//Triggered when the user clicks on a payment method
function clickPayment(listenerID,targetElement,chatbotInstance){
  //Set the payment variable with the clicked element
  switch (listenerID) {
    case cashListener:
      chatbotInstance.api.addVariable('payment','cash');
    break;
    case visaListener: 
      chatbotInstance.api.addVariable('payment','visa');
    break;
    case paypalListener:
      chatbotInstance.api.addVariable('payment','paypal');
    break;
  }
  //Remove the listeners, since we don't want the user to select a different method.
  chatbotInstance.helpers.removeListener(cashListener);
  chatbotInstance.helpers.removeListener(visaListener);
  chatbotInstance.helpers.removeListener(paypalListener);
  chatbotInstance.actions.displayChatbotMessage(finalMessage);
}
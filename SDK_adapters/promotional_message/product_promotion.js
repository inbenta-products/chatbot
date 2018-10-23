/**
 * This adapter creator export an adapter that shows a promotional message when the conversation window is shown.
 */
function createPromotionOnShowConversation() {
  return function(chatBot){
    //variable to control that the promotion will be shown only the first time the ConversationWindow shown
    var isConversationShown = false;
    chatBot.subscriptions.onShowConversationWindow(function(next) {
      if (isConversationShown) {
        // if isConversationShown is true, execute the next callback
          return next();
      }
      //conversationWindow message
      var conversationWindowData = {
        type:'answer',
        message:'hello, we have a new special promotion just for you!',
        options:null,
      };
      //sideWindow information
      var SideWindowData = {
        sideWindowContent: "<p>We have this new product, check it out here!</p>"
          +"</p><img src='https://www.inbenta.com/wp-content/themes/inbenta/img/icons/inbentabot.svg' alt='Mountain View' width='500' height='377'>"
          +"<p><a href='https://www.inbenta.com/en/features/chatbots/'>Check our new Chatbot!</a></p>",
        sideWindowTitle: "Special Promotion fake Product",
      };
      //display a chatbot message in conversationWindow
      chatBot.actions.displayChatbotMessage(conversationWindowData);
      //display more information in the sideWindow
      chatBot.actions.showSideWindow(SideWindowData);
      //sets to true in order to show the promotion only the first time
      isConversationShown = true;

      return next();
    });
  };
}
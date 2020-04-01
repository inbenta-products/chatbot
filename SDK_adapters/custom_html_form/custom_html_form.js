/**
 * Creates a customWindow with an HTML form, when a message is sent to be Chatbot, or when the `conversationWindow` is shown.
 */
function createCustomHTMLForm(checkAgents,noAgentsAvailable) {
  var systemMessageEscalationID = "";
  var escalateSystemMessageData = {
      message: 'escalate-chat',
      translate: true,
      options: [
          {label: 'yes', value:'yes'},
          {label: 'no', value:'no'}
        ]
    };
  var customFormHTML = {
      content: '<form class="inbenta-bot-escalation__form" onsubmit="return escalate();">'
      +'<div class="inbenta-bot-escalation__form__item"><div class="inbenta-bot-escalation-group"><div class="inbenta-bot-escalation-group__item__label">What is your first name?:</div><input type="text" class="inbenta-bot-input" name="FIRST_NAME"></div></div>'
      +'<div class="inbenta-bot-escalation__form__item"><div class="inbenta-bot-escalation-group"><div class="inbenta-bot-escalation-group__item__label">What is your last name?:</div><input type="text" class="inbenta-bot-input" name="LAST_NAME"></div></div>'
      +'<div class="inbenta-bot-escalation__form__item"><div class="inbenta-bot-escalation-group"><div class="inbenta-bot-escalation-group__item__label">What is your email?:</div><input type="text" class="inbenta-bot-input" name="EMAIL_ADDRESS"></div></div>'
      +'<div class="inbenta-bot-escalation__form__item"><div class="inbenta-bot-escalation-group"><div class="inbenta-bot-escalation-group__item__label">Can you brefly explain your problem?:</div><input type="text" class="inbenta-bot-input" name="CONTACT_REASON"></div></div>'
      +'<br><br><button type="submit" value="Submit" class="inbenta-bot-button">Submit</button> '
  }; 

  return function(Chatbot){
      //Show escalation SystemMessage when opening the conversationWindow.
      Chatbot.subscriptions.onShowConversationWindow(function(next) {
          systemMessageEscalationID = Chatbot.actions.displaySystemMessage(escalateSystemMessageData);
          return next();
      });
      //Capture selectedOption in selectedSystemMessageOption to perform the escalation
      Chatbot.subscriptions.onSelectSystemMessageOption(function(optionData, next) {
            if (optionData.id !== systemMessageEscalationID) {
                return next(optionData);
            }
            if (optionData.option.value == "yes") {
              checkAgents().then(function(result) { //it's a promise
                  if (result.agentsAvailable) {
                  Chatbot.actions.showCustomConversationWindow(customFormHTML);
                  }else{ //No agents available
                      Chatbot.actions.displaySystemMessage(noAgentsAvailable);
                  }
              });
            } else {
                //Rejected escalation
              Chatbot.actions.displayChatbotMessage({type:'answer', message: "What else can I do for you?"});
            }
        });
      Chatbot.subscriptions.onSendMessage(function(messageData,next) {
          systemMessageEscalationID = Chatbot.actions.displaySystemMessage(escalateSystemMessageData);
      });
      //Get capture the input form, get the Data, parse to key-> value, and send it to escalateToAgent so external chat subscription can get the data
      function escalate(){
          var escalationInfo=[];
          event.preventDefault();
          var results = document.querySelectorAll(".inbenta-bot-escalation__form__item .inbenta-bot-input");
          for (let index = 0; index < results.length; index++) {
              var key = results[index].name;
              escalationInfo[key] = results[index].value;
              
          }
          Chatbot.actions.escalateToAgent(escalationInfo);
          Chatbot.actions.hideCustomConversationWindow();
      }
      window.escalate = escalate;
  };
}
window.createCustomHTMLForm = createCustomHTMLForm;

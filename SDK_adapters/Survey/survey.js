
/**
 *  Will display the survey after the user clicks on close conversation button.
 */
function showSurvey(surveyID) {
  var surveyProcess='toInit'; //Check if we're already showing the survey
  return function(chatbot){
    window.addEventListener("message", receiveMessage, false); //event listener triggered on survey completition
    /**
     * 
     * @param {Object} event used to detct that the survey has been submitted
     */
    function receiveMessage(event) {
      if (event.data.message == "inbenta.survey.successful_answer") {
        surveyProcess='toFinish';
        chatbot.actions.resetSession(); //Close chatbot and resetSession
      }
    }
    chatbot.subscriptions.onResetSession(function(next) {
      if(surveyProcess!=='toInit'){ //Already showing the survey
        surveyProcess='toInit';
        return next(); //return next in order to allow the resetSession, user clicked close button  while the survey was being shown.
      }else { 
        var surveyURL = chatbot.api.getSurvey(surveyID); //get survey data
        surveyURL.then(({data})=>{
          var survey={
            content: '<iframe name="inbenta-survey" src=' + data.url + '></iframe>'
          };
          chatbot.actions.showCustomConversationWindow(survey); //show Survey iframe on the customConversationWindow.
          surveyProcess = 'inProgress';
        });
      }
    });
    chatbot.subscriptions.onDisplaySystemMessage(function(messageData,next) {
      if(messageData.id=="exitConversation"){
        if(surveyProcess=='inProgress'){
          chatbot.actions.resetSession();
        }else {
          return next(messageData);
        }
      }
    });
  };
}
window.showSurvey = showSurvey;

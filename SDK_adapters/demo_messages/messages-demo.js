function messagesDemoAdapter(bot) {
  var mediaChatbotMessage = {
    'type': 'answer',
    'message': 'Hello! This my default test message. Happy to help you!',
    'media': {
      name: 'my-file.jpg',
      url: '/path/to/my-file.jpg'
    }
  };
  var activityDemoMessage = {
      type: 'answer',
      message: 'Write down <b>agent</b> if you want to see the Chatbot Activity as a message.'+
      'Write down <b>default</b> if you want to see the default Chatbot Activity, and <b>hide activity</b> in order to hide the activity'
    };
  var ratingMessage = {
    type: 'answer',
    message: 'Rating example',
    trackingCode: {
      clickCode :"test",
      rateCode :"test"
    },
    sideWindowContent: "test",
    parameters:{
      contents:{
        trackingCode:{
          clickCode :"test",
          rateCode :"test"
        }
      }
    }
  };
  var modalSystemMessage = {
      message: 'Modal systemMessage example',
      translate: true,
      modal:true,
      id:"testing",
      closeChat:true,
      options: [
          {label: 'First',value:'yes'},
          {label: 'Second', value:'no'}
        ]
  };
  var customWindowHTML = {
    content: '<form class="inbenta-bot-escalation__form">'+
        'First name:<br>'+
        '<input type="text" class="inbenta-bot-input" name="firstname" value="Luke">'+
        '<br>Last name:<br>'+
        '<input type="text" class="inbenta-bot-input" name="lastname" value="Skywalker"><br><br><button type="submit" class="inbenta-bot-button">Submit</button> '
  };
  var buttonsWarning = {
      type: 'answer',
      message: '<b>Messages with buttons may have buttons disabled</b>. '+
      'If you want to see the enabled buttons, ask any of the following questions and I will show you'
    };
  var Options={
      type: 'answer',
      message: '<ul><li>multiple</li><li>polar</li><li>system</li><li>side window</li><li>media</li><li>related</li><li>show upload</li><li>hide upload</li><li>agent</li><li>default</li><li>hide activity</li><li>system modal</li><li>custom window</li><li>federated search</li><li>federated km</li><li>federated nothing</li><li>rating</li></ul>'
    };
  var KMContentsMessage ={
    message: 'Introduction text for a km content',
    type: 'extendedContentsAnswer',
    subAnswers:[
      {
        attributes: {
          AnswerText: 'testAnswerText',
          SideBubble_text:'test SideBubble'
        },
        flags: [],
        message:'KMContent1Message',
        options:null,
        sideWindowTitle:"KM windowTitle content 1",
        sideWindowContent:"KM SideWindow content1!",
        parameters:{
          contents:{
            attributes:{
              SideBubble_text:'text'
            },
            title: 'example',
          }
        },
        source:{
          type:'external_search',
          name: 'Search api testing)'
        }
      },
      {
        attributes: {
          AnswerText: 'testAnswerText',
          SideBubble_text:'test SideBubble'
        },
        sideWindowTitle:"KM windowTitle content 2",
        sideWindowContent:"KM SideWindow content2!",
        flags: [],
        message:'KMContent2Message',
        options:null,
        parameters:{
          contents:{
            attributes:{
              SideBubble_text:'text'
            },
            title: 'example2',
          }
        },
        source:{
          type:'external_search',
          name: 'Search api testing)'
        }
      }
    ]
  };
  var searchContentsMessage ={
    message: 'Introduction text for searchContents!',
    type: 'extendedContentsAnswer',
    subAnswers:[
      {
        attributes: {
          AnswerText: 'testAnswerText',
          SideBubble_text:'test SideBubble'
        },
        flags: [],
        message:'SearchContent1Message',
        url: {
          value: "https://www.google.com",
          target:"_blank"
        },
        options:null,
        parameters:{
          contents:{
            attributes:{
              SideBubble_text:'text'
            },
            title: 'example',
          }
        },
        source:{
          type:'external_search',
          name: 'Search api testing)'
        }
      },
      {
        attributes: {
          AnswerText: 'testAnswerText',
          SideBubble_text:'test SideBubble'
        },
        url: {
          value: "https://www.google.com",
          target:"_self"
        },
        flags: [],
        message:'SearchContent2Message',
        options:null,
        parameters:{
          contents:{
            attributes:{
              SideBubble_text:'text'
            },
            title: 'example2',
          }
        },
        source:{
          type:'external_search',
          name: 'Search api testing)'
        }
      }
    ]
  };
  var nothingContentsMessage ={
    message: 'Introduction text for nothingContents',
    type: 'extendedContentsAnswer',
    subAnswers:[
      {
        attributes: {
          AnswerText: 'testAnswerText',
        },
        flags: [],
        message:'This type of answer just displays information, no action-click  ',
        options:null,
        parameters:{
          contents:{
            title: 'example',
          }
        },
        source:{
          type:'external_search',
          name: 'Search api testing)'
        }
      },
      {
        attributes: {
          AnswerText: 'testAnswerText',
        },
        flags: [],
        message:'NothingContent2Message',
        options:null,
        parameters:{
          contents:{
            title: 'example',
          }
        },
        source:{
          type:'external_search',
          name: 'Search api testing)'
        }
      },
    ]
  };
  bot.subscriptions.onReady( function(next) {
    // show a message with all the options only if there are less than 3 messages
    if (bot.actions.getConversationTranscript().length > 3) {
      return next();
    }
    bot.actions.displayChatbotMessage(activityDemoMessage);
    //buttons warning message
    bot.actions.displayChatbotMessage(buttonsWarning);
    //All the different options that can be seen in the adapter
    bot.actions.displayChatbotMessage(Options);
    bot.actions.displayUserMessage({message: 'Normal user message'});
    var singleTickID = bot.actions.displayUserMessage({message: 'User message with a single tick'});
    var doubleTickID = bot.actions.displayUserMessage({message: 'User message with a double tick'});
    var waitingID = bot.actions.displayUserMessage({message: 'User message with a double tick'});
    var errorID = bot.actions.displayUserMessage({message: 'User message with a double tick'});
    bot.actions.updateMessage({id: singleTickID, action: 'SINGLE_TICK'});
    bot.actions.updateMessage({id: doubleTickID, action: 'DOUBLE_TICK'});
    bot.actions.updateMessage({id: waitingID, action: 'WAITING_TICK'});
    bot.actions.updateMessage({id: errorID, action: 'ERROR_TICK'});

    bot.actions.displayChatbotMessage({message: 'Answer message', type: 'answer',    parameters:{
      contents:{
        trackingCode:{
          clickCode :"test",
          rateCode :"test"
        }
      }
    }});
    bot.actions.displayChatbotMessage(mediaChatbotMessage);
    displaySideWindowAnswer(bot)
    displayPolarQuestionAnswer(bot);
    displayMultipleAnswer(bot);
    displaySystemMessage(bot);
    bot.actions.showConversationWindow();
    next();
  });
  /**
   * Subscription to sendMessage, it will interrupt the message if we have a match with the following cases
   */
  bot.subscriptions.onSendMessage(function(messageData, next) {
    switch (messageData.message) {
      case 'multiple':
        displayMultipleAnswer(bot);
        break;
      case 'show upload':
        bot.actions.showUploadMediaButton()
        break;
      case 'hide upload':
        bot.actions.hideUploadMediaButton()
        break;
      case 'polar':
        displayPolarQuestionAnswer(bot);
        break;
      case 'system':
        displaySystemMessage(bot);
        break;
      case 'side window':
        displaySideWindowAnswer(bot);
        break;
      case 'media':
        displayMediaAnswer(bot);
        break;
      case 'related':
        displaySideWindowAnswer(bot);
        break;
      case 'agent':
        bot.actions.displayChatbotActivity({translate: true, message: 'agent-joined', replacements: {agentName: 'Mr Agent', anotherAgent: 'Mr Another'}});
        break;
      case 'default':
        bot.actions.displayChatbotActivity();
        break;
      case 'hide activity':
        bot.actions.hideChatbotActivity();
        break;
      case 'system modal':
        bot.actions.displaySystemMessage(modalSystemMessage);
        break;
      case 'custom window':
        bot.actions.showCustomConversationWindow(customWindowHTML);
        break;
      case 'federated search':
        bot.actions.displayChatbotMessage(searchContentsMessage);
        break;
      case 'federated km':
        bot.actions.displayChatbotMessage(KMContentsMessage);
        break;
      case 'federated nothing':
        bot.actions.displayChatbotMessage(nothingContentsMessage);
        break;
      case 'rating':
        bot.actions.displayChatbotMessage(ratingMessage);
        break;
      default:
        next(messageData);
        return;
    }
  });
// Do not send to the Inbenta API the message when user clicks a polar question or multiple choice button
  bot.subscriptions.onSendMessage(function(messageData, next) {
    if (messageData.userActivityOptions === 'demo') return;
    return next(messageData);
  });
}

function displayMultipleAnswer(bot) {
  bot.actions.displayChatbotMessage({
    message: 'Message with multiple choice. NOTE: the Chatbot won\'t response when you click a button, this is only a demo for showing all messages available',
    type: 'multipleChoiceQuestion',
    options: [
      {
        label: 'One option',
        value: 'demo'
      },
      {
        label: 'Another option',
        value: 'demo'
      },
      {
        label: 'The last question',
        value: 'demo'
      }
    ]
  });
}

function displayPolarQuestionAnswer(bot) {
  bot.actions.displayChatbotMessage({
    message: 'Polar question message. As an exmaple, this is a yes/no message. NOTE: the Chatbot won\'t response when you click a button, this is only a demo for showing all messages available',
    type: 'polarQuestion',
    options: [
      {
        label: 'yes',
        value: 'demo'
      },
      {
        label: 'no',
        value: 'demo'
      }
    ]
  });
}

function displayMediaAnswer(bot) {
  bot.actions.displayChatbotMessage({
      'type': 'answer',
      'message': 'Hello! This my default test message. Happy to help you!',
      'media': {
        name: 'my-file.jpg',
        url: '/path/to/my-file.jpg'
      }
  });
}

function displaySideWindowAnswer(bot) {
  var now = new Date();
  var sideWindow = {
    sideWindowContent: '<p>You can open me again clicking the "More info" faq\'s button. '+
    'Ask the following on order to have the different outputs:</p> </b></br><ul><li>multiple</li><li>polar</li><li>system</li><li>side window</li>'+
    '<li>media</li><li>related</li><li>show upload</li><li>hide upload</li><li>agent</li><li>default</li><li>hide activity</li><li>system modal</li><li>custom window</li><li>federated search</li><li>federated km</li><li>federated nothing</li><li>rating</li></ul>',
    sideWindowTitle: 'Hello world!',
    trackingCode: 'testTrackingCode'
  };

  bot.actions.displayChatbotMessage({
    message: 'Answer message with a side window',
    type: 'answer',
    sideWindowContent: sideWindow.sideWindowContent,
    sideWindowTitle: sideWindow.sideWindowTitle,
    trackingCode: 'testTrackingCode',
    parameters:{
      contents:{
        title:"example content title",
        related:{
          relatedContents:[{title: "Related content exampe", id: ""}],
          relatedTitle:"You might also be interested in"
        },
        trackingCode:{
          clickCode :"test",
          rateCode :"test"
        }
      }
    }
  });
  bot.actions.showSideWindow(sideWindow);
}

function displaySystemMessage(bot) {
  bot.actions.displaySystemMessage({
    message: 'This is a system message without buttons',
  });

  bot.actions.displaySystemMessage({
    message: 'This is a system message with two options!',
    options: [
      {
        label: 'Hello',
        value: 'demo'
      },
      {
        label: 'Good bye!',
        value: 'demo'
      }
    ]
  });
}
window.messagesDemoAdapter = messagesDemoAdapter;

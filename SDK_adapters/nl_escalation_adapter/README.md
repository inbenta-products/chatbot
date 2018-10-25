
### Introduction
The purpose of this adapter is to confirm a user's intent to escalate, and call an intent in a Chatbot instance to gather the data needed to escalate.

Once the user completes the form, the intent executes a `js_callback: escalate`. This triggers the `escalateToAgent` action on the Chatbot SDK. At this point, the second adapter is subscribed to the `escalate` action, to retrieve the information and initiate the live chat.

You must configure several linguistic settings in your Backstage instance to trigger the escalation.

### Configuration parameters

The ```launchNLEsclationForm``` function creates the adapter. These are the entry parameters:

- External `checkAgents` function: This must be a function. It comes from the external chat adapter and checks if there are available Agents. If you use the code samples below, make sure to replace `checkAgents` with the appropriate function name from your chosen product.

- `ChatWithLiveAgentContactForm`: This String is the string sent to the API. It must match the form that will ask for the `userInformation`, and use the js_callback to trigger the `escalateToAgent` action.

- `rejectedEscalation`: An object that defines what to display when the user rejects the escalation. There are two options: 
    - action: `IntentMatch`: Sends the value parameter to the API, and should match with an intent.
    - action: `displayChatbotMessage` creates an answer directly with the given value.
    - value: Message that is either sent to the API or displayed as a chatbotMessage.
    
- `noAgentsAvailable`: An object that defines what to display when there are no agents available and the client has tried to speak with a human. There are two options:
  - action: `IntentMatch`: Sends the value parameter to the API, and should match with an intent.
  - action: `displayChatbotMessage` creates an answer directly with the given value.
  - value: Message that is either sent to the API or displayed as a chatbotMessage.

- No-results (default 3): number of times in a row the chatbot will display a no-results message before trigger the escalation.

`RejectedEscalation` and `noAgentsAvailable`  can be configured in order to either show the value as a chatbotMessage if the action is ```displayChatbotMessage```, or it can be sent to the InbentaAPI in order to retrieve the answer from an Intent.

In the example below, we show the value of the `rejectedEscalation` as a `chatbotAnswer`, and do a linguistic match in the `NoAgentsAvailable` to show the content of the intent.

More information related to the adapter can be found in https://apidocs.inbenta.io/javascript-sdks/chatbot/sdk-adapters/nl-escalation-adapter
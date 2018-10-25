# Introduction

This adapter redirects the user to another domain, and allows them to continue the previous conversation with the Chatbot SDK.


### How does it work ?    
1. It displays an initial message, using the `onReady` subscription, and `displayChatbotMessage` action, that explains that upon writing the cross-domain, the user will be redirected.   

2. If the user asks to go cross-domain, we detect it through the `sendMessage` subscription. We then perform the <a href="https://apidocs.inbenta.io/javascript-sdks/chatbot/sdk-customization/actions#getsessiondata">getSessionData</a> action to retrieve all the relevant information of the conversation (previous messages, sessionToken, position, etc.), and store it in a variable called `sessionData`.

3. A `systemMessage` with a button displays with a link to the new website and adds this information in the link.

4. When the user clicks on the button, we detect it with the <a href="https://apidocs.inbenta.io/javascript-sdks/chatbot/sdk-customization/subscriptions#onselectsystemmessageoption">onSelectSystemMessageOption</a> subscription. We then use a POST method to submit a form that contains all the `sessionData` information.

5. Afterwards, we redirect the user with the `onReady` subscription. upon detection that the `sessionData` was sent with a POST method, we perform a <a href="https://apidocs.inbenta.io/javascript-sdks/chatbot/sdk-customization/actions#getsessiondata">setSessionData</a> action to set the chatbot SDK in the same state as it was in the source website.

More information related to the adapter can be found in https://apidocs.inbenta.io/javascript-sdks/chatbot/sdk-adapters/cross-domain
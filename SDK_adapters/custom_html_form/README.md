### Introduction

The purpose of this adapter is to confirm a user's intent to escalate, and call an HTML form to gather the data required to escalate.

Once the user completes the form, the intent executes a `js_callback: escalate` that triggers the `escalateToAgent` action on the Chatbot SDK. At this point, the second adapter is subscribed to the `escalate` action, to retrieve the information and initiate the live chat.

Inbenta recommends that you use the internal adapter https://developers.inbenta.io/chatbot/javascript-sdk/sdk-adapters/html-escalation-adapter. If you need custom features, the code samples below function the same way as the internal adapter, and can give you some insight on how to create your own escalation adapter.

In the case shown, the questions are directly created inside the adapter in the `customFormHTML` variable.

**Caution:** Inbenta does not support or maintain this code. For full support and guaranteed functionality, use the internal adapter.

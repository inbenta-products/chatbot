# Introduction

This adapter allows the modification of the labels used by the Chatbot SDK. It performs a request on AppData and delays the execution of the visual components until the request is fulfilled.

The SDK will show the interface-title label that is retrieved from AppData. The adapter also uses LocalStorage to cache the AppData request.

Caution: This is a solution for systems that do not have their own CMS system. The recommended flow is to use system variables directly inside the build method as it allows you to modify the labels and other settings before the SDK starts. The use of Inbenta AppData will perform one additional API request per user, which may delay the render of the SDK view as long as the API request is not fulfilled.

Inbenta recommends that you use your own content management system to store this configuration.

More information related to the adapter can be found in https://apidocs.inbenta.io/javascript-sdks/chatbot/sdk-adapters/AppData-labels
### Introduction

The purpose of this page is to explain the Language Detector adapter and show an example of how to use this functionality in multiple language instances.

The Chatbot API and JS Client provide an endpoint and a method respectively, that allow you to detect the language of the user question. You can then use this information to suggest which one of your Inbenta instances would be the best suited to provide results to this question.

For more information about the language detector and to learn how to create the intents and variables recommended for this adapter, visit the following [section](https://developers.inbenta.io/chatbot/language-detection/language-detection-overview).

Suppose that your website is www.inbenta-example.com, and you have it in both English and Spanish at www.inbenta-example.com/en/ and www.inbenta-example.com/es/.

In this example, you use the language detector when you detect that an input did not return any results. 

Use the `onCustomTrigger` subscription to detect when the chatbot has no results for the user query.
Inside this subscription, you perform a request to language detector and set the variable `different_language_detected` with the results of the language detector.

Then, a directCall is done to `language-detection-after-no-results`. This is a dialog with a `Redirect Language  to Spanish website` intent to ask the user to navigate to the Spanish website, and a `No different language detected` intent with the default no-results message.

The `Answer_text` attribute of the `Redirect Language  to Spanish website` intent has a message in Spanish that points the user to the correct website.

The Chatbot evaluates the variable condition to show one intent or the other, depending on the variable value.


```html
<p>
Parece que estás hablando en Castellano, dirígete a nuestra página en  <a href="www.inbenta-example.com/es/">Castellano</a>.
</p>

```


**Caution:** Inbenta does **not** recommend that you use the language detector on every user-message: This doubles the number of API requests performed by the SDK and it can impact your rate limits.

### Requirements

Follow the instructions suggested in the [Language detector](https://developers.inbenta.io/chatbot/language-detection/language-detection-overview) option 2 `Use the No Results dialog`, this dialog will be modified, and also a new intent with the `js_callback: customTrigger` will be added.

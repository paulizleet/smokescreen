// background-script.js

// function handleMessage(request, sender, sendResponse) {
//   console.log(request);
//   console.log(sender);
//
//   console.log("Message from the content script: " +
//     request.greeting);
//   sender.sendResponse({response: "Response from background script"});
// }
var axios = require("./axios.js")
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {

  request = axios.get(request.url);

  sender.sendResponse(request.content)
}

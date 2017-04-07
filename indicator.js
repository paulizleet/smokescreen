// content-script.js

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var sending = browser.runtime.sendMessage({
    url: "http://www.reddit.com"
  });
  sending.then(handleResponse, handleError);
}

request = axios.get("http://www.reddit.com");
window.addEventListener("click", notifyBackgroundPage);

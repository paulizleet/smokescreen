var recentPages = JSON.parse(localStorage.getItem("recentPages"))
var rawHTML =""
var doc = document.createElement("html");

function reqListener () {
  rawHTML = this.responseText;
  doc.innerHTML = rawHTML;
}

function request() {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "file:///Users/apprentice/smokescreen/test_site/good1.html");
  oReq.send();
}

function addToRecent() {
    recentPages.push(url)
}


function isLoop() {
  addToRecent();
  if (recentPages.length > loop_length) {
    recentPages.shift();
    return [...new Set(recentPages)].length == 2
  }
}

function redirect() {
  if (url!=undefined && isLoop()==false ) {
    oReq.open("GET", url);
    oReq.send();
    localStorage.setItem("recentPages", JSON.stringify(recentPages))
  }
}

function crawl(){
  var linkObjects = doc.getElementsByTagName("a");
  var i;
  var urls =[];
  var loop_length = 6;
  request();
  console.log(linkObjects.length)
  for (i = 0; i< linkObjects.length; i++){
    console.log(linkObjects[i].href)
    urls.push(linkObjects[i].href)
  }

  var url = urls[Math.floor(Math.random()*urls.length)];




  setTimeout(redirect, 5000)
};


crawl()

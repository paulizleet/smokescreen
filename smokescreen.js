var recentPages = JSON.parse(localStorage.getItem("recentPages")) || []
var loopLength = 6

function addToRecent(url) {
  recentPages.push(url)
}

function handleResponse(){
  console.log("OK");
  console.log(this);
}

function handleXhrErrors(){
  console.log("errors");
  console.log(this);
  console.log(this.responseText);
}

function isLoop(url) {
  console.log(url)
  addToRecent(url);
  if (recentPages.length > loopLength) {
    recentPages.shift();
    recentPages.forEach(function(page) {
      console.log(page)
    })
    return [...new Set(recentPages)].length == 2
  }
  return false
}

function pickUrl(urls){
  //urls = filter(urls);
  var url = urls[Math.floor(Math.random()*urls.length)];

  if(url == undefined){
    console.log("no urls to grab");
    return false;
   }


   if (isLoop(url.href) == true){
    console.log("this is a loop");
    return false
   }
  return url.href;
};

function getPageSourceXHR(url) {

  if(url == undefined){    return document }

  var xreq = new XMLHttpRequest();
  console.log(url);
  xreq.open("get", url, false);
  xreq.withCredentials = true;
  xreq.onload = handleResponse;
  xreq.onerror = handleXhrErrors;
  xreq.ontimeout = handleXhrErrors;
  //  xreq.setRequestHeader('Access-Control-Allow-Origin', true)
  xreq.send();
  return xreq.responseText;
}

function getPageSourceAxios(url){
  if(url == undefined){    url=browser.runtime.getURL("starting-page.html") }
  try{  request = axios.get(url);
  } catch (e) {
    console.log(e);
  }
  request = axios.get(url);
  console.log("debuggin");

  return request
}

function parseDoc(source){

  if(source == document){   return source;   }

  var parser = new DOMParser();

  parsed = parser.parseFromString(source, "text/html");
  console.log(parsed);
  return parsed;
}

function xcrawl(){
  console.log("Crawling");
  var url;

  var pageSource;
  var doc;
  var urls;
  for(var i = 0; i < 5; i++){
    console.log(i);
    console.log(url);

    try{
      pageSource = getPageSourceAxios(url);
    } catch (error){
      console.log("woops");
      console.log(error);
      console.log(url);
    }

    doc = parseDoc(pageSource);
    urls = doc.getElementsByTagName("a");
    console.log("We now have " + urls.length + " urls");
    url = pickUrl(urls);

    if(url == ""){  continue; }

    if(url == false){ return url; }

  }
  console.log("done");
  return false;
}
xcrawl();

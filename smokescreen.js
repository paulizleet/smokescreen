var recentPages = JSON.parse(localStorage.getItem("recentPages"))
var loopLength = 6

function addToRecent(url) {
  recentPages.push(url)
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


function getPageSource(url) {

  if(url == undefined){    return document;   }

  var xreq = new XMLHttpRequest();
  xreq.open("get", url, false);
  xreq.send();
  return xreq.responseText;
}

function parseDoc(source){

  if(source == document){   return source;   }

  var parser = new DOMParser();

  parsed = parser.parseFromString(source, "text/html");
  console.log(parsed);
  dump(parsed.documentElement.nodeName == "parsererror" ? "error while parsing" : parsed.documentElement.nodeName);

}

function xcrawl(){

  var url;

  var pageSource;
  var doc;
  var urls;
  for(var i = 0; i < 100; i++){
    console.log(i);

    pageSource = getPageSource(url);

    doc = parseDoc(pageSource);
    urls = doc.getElementsByTagName("a");
    console.log("We now have " + urls.length + " urls");
    url = pickUrl(urls);

    if(url == ""){  continue; }

    //if(url == false){ return url; }

  }
  console.log("done");
  return false;
}


xcrawl();

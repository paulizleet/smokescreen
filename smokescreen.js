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
  if(source == document){   return document;   }
  var parser = new DOMParser();
  return parser.parseFromString(source, "text/html");
}

function xcrawl(){

  var url;
  for(var i = 0; i < 15; i++){
    console.log(i);
    console.log(url)
    var pageSource = getPageSource(url);
    doc = parseDoc(pageSource);
    url = pickUrl(doc.getElementsByTagName("a"));

    if(url == ""){  continue; }

    //if(url == false){ return url; }

  }
  return false;
}


xcrawl();

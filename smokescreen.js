
function pickUrl(urls){
  //urls = filter(urls);
  var url = urls[Math.floor(Math.random()*urls.length)];

  if(url == undefined){
    console.log("no urls to grab");
    return false;
   }

  return url.href;
};

function getPageSource(url) {

  if(url == undefined){    return document;   }

  var xreq = new XMLHttpRequest();
  console.log(url);
  xreq.open("get", url, false);
  xreq.send();
  return xreq.responseText;
}

function parseDoc(source){
  if(source == document){   return document;   }
  var parser = new DOMParser();
  return parser.parseFromString(source, "application/xml");
}

function xcrawl(){

  var url;
  for(var i = 0; i < 5; i++){
    console.log(i);
    var pageSource = getPageSource(url);
    doc = parseDoc(pageSource);
    url = pickUrl(doc.getElementsByTagName("a"));

    if(url == ""){  continue; }

    //if(url == false){ return url; }

  }
  return false;
}


xcrawl();

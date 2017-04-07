
function pickUrl(urls){
  //urls = filter(urls);
  var url = urls[Math.floor(Math.random()*urls.length)];
  //debugger
  if(url == undefined){
    console.log("no urls to grab");
    return false;
   }

  return url.href;
};

function filterUrls(page){
  list = page.getElementsByTagName("a");
  debugger
  for(var i = 0; i < list.length; i++){
    if(list[i].href.match(/(.tar|.exe|.zip|.pdf|.wav|.txt).*/) == null)
    {
      console.log(list[i]);
    }
    else{
      list[i].remove();
    }
  }

  return list;
}

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
  return parser.parseFromString(source, "text/html");
}

function xcrawl(){

  var url;
  for(var i = 0; i < 5; i++){
    console.log(i);
    var pageSource = getPageSource(url);
    doc = parseDoc(pageSource);
    //test line:
    filter = filterUrls(doc);

    url = pickUrl(filter);

    if(url == ""){  continue; }

    //if(url == false){ return url; }

  }
  return false;
}


xcrawl();

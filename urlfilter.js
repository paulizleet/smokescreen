function filterUrls(page){
  //filter creates our HTML Collection of links.
  list = page.getElementsByTagName("a");

  for(var i = 0; i < list.length; i++){
    if(list[i].href.match(/(.tar|.exe|.zip|.pdf|.wav|.txt).*/) == null)
    {//just push forward if current link doesn't hold unaccepted file extension
     continue;
    }
    else{
      //remove from list of links otherwise.
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
    //filter takes a parsed document.
    filter = filterUrls(doc);
    return filter;
  }
  return false;
}


xcrawl();

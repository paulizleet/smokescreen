function crawl(){
  var linkObjects = document.getElementsByTagName("a")
  var i;
  var urls =[]
  for (i = 0; i< linkObjects.length; i++){
    urls.push(linkObjects[i].href)
  }

  //this code will stop the looping if there are no available links to click.
  if (urls.length > 0){
    var url = urls[Math.floor(Math.random()*urls.length)];

    var window2 = window;


    setTimeout(window2.location.replace(url), 5000);

   }
  else{
    alert("NO LINKS");
  }
};


crawl()

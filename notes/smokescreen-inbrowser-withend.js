var recentPages = JSON.parse(localStorage.getItem("recentPages"))
function crawl(){
  console.log("runs")
  var linkObjects = document.getElementsByTagName("a")
  var i;
  var urls =[]
  var loop_length = 6

  for (i = 0; i< linkObjects.length; i++){
    urls.push(linkObjects[i].href)
  }
  var url = urls[Math.floor(Math.random()*urls.length)];


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
      window.location.href = url
      localStorage.setItem("recentPages", JSON.stringify(recentPages))
    }
  }


  setTimeout(redirect, 5000)
};


crawl()

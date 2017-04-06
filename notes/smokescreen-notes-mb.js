//get all urls from page
var linkObjects = document.getElementsByTagName("a")
var urls =[]

//have to loop because getelements is a nodelist, not array
var i;
for (i = 0; i< linkObjects.length; i++){
  urls.push(linkObjects[i].href)
}

// url = undefined if no urls

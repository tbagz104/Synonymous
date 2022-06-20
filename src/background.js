//Background Script
// console.log("BG RUNNING")

window.wordSelected = ""

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    
    console.log(message.text)
    window.wordSelected = message.text
    // sendHTMLPageRequest(`https://www.google.com/search?q=${message.text}+synonyms`)
    // var google_html = httpGet(`https://www.google.com/search?q=${(message.text).toLowerCase()}+synonyms`)
    var thesaurus_html = httpGet(`https://www.thesaurus.com/browse/${(message.text).toLowerCase()}`)
    
    // try{
    //     window.google_syn_arr = convertToDOM(google_html)
    // }
    // catch{
    //     console.log("yep")
    //     window.google_syn_arr = []
    // }

    try{
        window.thesaurus_syn_arr = convertToDOM(thesaurus_html)
        // console.log(window.thesaurus_syn_arr.length)
    }catch{
        console.log("yep")
        window.thesaurus_syn_arr = []
    }

    if (message.text != "")
        sendResponse({farewell: "got word selected"});

});


function scrapeWebPage(){

    test = document.getElementsByClassName("bqVbBf jfFgAc")
    counter = 0
    for(item of test.item(0).children){
        console.log(item.querySelector("span").textContent)
        counter++
    }

}

function httpGet(theUrl)
{
    let xmlhttp;
    
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    
    return xmlhttp.response;
}

async function myFetch(message) {
    let response = await fetch(`https://www.google.com/search?q=${message}+synonyms`);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    let text = await response.text(); // await ensures variable has fulfilled Promise
    var arr = convertToDOM(text)
    
    return 5

  }

function sendHTMLPageRequest(url){

    var request = makeHttpObject();
    request.open("GET",url, true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4){
            var html = request.responseText
            convertToDOM(html)
        }
    };

    console.log(arr.length)
}

function convertToDOM(html){
    var doc = new DOMParser().parseFromString(html, "text/html");
    
    // test = doc.getElementsByClassName("bqVbBf jfFgAc")
    
    var array = []
    // for(item of test.item(0).children){
    //     // console.log(item.querySelector("span").textContent)
    //     array.push(item.querySelector("span").textContent)
    // }

    test = doc.getElementsByClassName("css-ixatld e15rdun50")
    // console.log(test)
    for(item of (test.item(0).children.item(1).children)){
        // console.log(item.querySelector("a").textContent)
        array.push(item.querySelector("a").textContent)
    }

    return array
}

function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
  
    throw new Error("Could not create HTTP request object.");
}
  

//Main Script

let bgPage = chrome.extension.getBackgroundPage();
let word = document.getElementById("word-selected")
word.innerText = bgPage.wordSelected;

var google_synonyms_arr = (bgPage.thesaurus_syn_arr)
// console.log(bgPage.thesaurus_syn_arr.length)


window.addEventListener('mouseup',wordSelected);

function wordSelected(){

  let selectedWord = window.getSelection().toString().trim();

  if(document.querySelector("#popup_iframe_id")!=null)
    console.log(selectedWord + 'iframe');

}

let url =  "https://api.dictionaryapi.dev/api/v2/entries/en/" + bgPage.wordSelected
loadJSON(url,definitionOutput,'jsonp')

function definitionOutput(data){
    
    for(def of data[0].meanings[0].definitions){  

      const para = document.getElementById("definition")
      para.innerText = def.definition
      break
    }
}

let syn_url =  `https://api.datamuse.com/words?ml=${bgPage.wordSelected}&max=12`
loadJSON(syn_url,synOutput,'jsonp')

function synOutput(data){

  let synonyms_array = [];

  for(syn_object of data){
    synonyms_array.push(syn_object.word)
  }
  generateSynonymsTable(synonyms_array)
}

generateGoogleSynonymsTable(google_synonyms_arr)

function generateGoogleSynonymsTable(google_synonyms_arr){

  let google_syn_heading = document.getElementById("google-synonyms")
  google_syn_heading.innerText = "Google Suggestions";

  if(google_synonyms_arr.length!=0){
  
    counter = 0
    let table = document.getElementById("tableIdGoogleSyn");
    let tableRow = document.createElement("tr")
    table.appendChild(tableRow)
  
    google_synonyms_arr.forEach((item) => {
  
      if((counter)%3 == 0){
        tableRow = document.createElement("tr")
        table.appendChild(tableRow)
      }
  
      let tableData = document.createElement("td");
      tableData.innerText = item;
      tableRow.appendChild(tableData);
  
      counter++
  
    });

  }

  else{

    let mainDiv = document.getElementById("mainDivId")
    let errorPara = document.createElement("p");
    errorPara.innerText = "Couldn't find anything.";
    mainDiv.appendChild(errorPara);

  }

}

function generateSynonymsTable(synonyms_array){

  counter = 0
  let table = document.getElementById("tableIdSyn");
  let tableRow = document.createElement("tr")
  table.appendChild(tableRow)

  synonyms_array.forEach((item) => {

    if((counter)%3 == 0){
      tableRow = document.createElement("tr")
      table.appendChild(tableRow)
    }

    let tableData = document.createElement("td");
    tableData.innerText = item;
    tableRow.appendChild(tableData);

    counter++

  });

}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        }
        else {
          error(xhr);
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
}



// ----------------TODO : Scrape---------------------------------
//Thesaurus

// test = document.getElementsByClassName("css-ixatld e15rdun50")
// for(item of test.item(0).children.item(0).children){
//      console.log(item.querySelector("a").textContent)
// }

//Google

// test = document.getElementsByClassName("bqVbBf jfFgAc")
// counter = 0
// for(item of test.item(0).children){
//     console.log(item.querySelector("span").textContent)
//     counter++
// }
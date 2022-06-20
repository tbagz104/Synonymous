//Content Script
// console.log("Testing");

var iframe = document.createElement('iframe');
iframe.id = "popup_iframe_id" 
iframe.style.background = "white";
iframe.style.height = "250px";
iframe.style.width = "0px";
iframe.style.position = "absolute";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.display = "block"
// iframe.style.borderRadius = "1em"
// iframe.style.MozBorderRadius = "1em"
// iframe.style.border = "0px solid #FF0000";
iframe.style.zIndex = "9000000000000000000";


window.addEventListener('click', event => {

   if (event.detail === 2) {
        wordSelected()
    }

    else{

        var iFrame = document.querySelector("#popup_iframe_id")

        if(iFrame!= null){
            // console.log(iFrame.style.width)
            if(iFrame.style.width != "0px")
                iFrame.style.width = "0px";
                iframe.style.border = "0px solid #FF0000";
        }
    }
})

function wordSelected(){

    var r = window.getSelection().getRangeAt(0).getBoundingClientRect();
    var relative = document.body.parentNode.getBoundingClientRect();

    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    // var height = window.innerHeight
    // || document.documentElement.clientHeight
    // || document.body.clientHeight;


    // console.log(width)
    // console.log(r.top,r.bottom)
    // console.log(relative.top,relative.bottom)

    // console.log("From Top : ",(r.top -relative.bottom)+'px')
    // console.log("From Right : ",(-(r.right-relative.right))+'px')
    
    iframe.style.top = (r.bottom -relative.top)+'px';

    var screen_overflow = width - (-(r.right-relative.right))
    // console.log("Screen Overflow: ",screen_overflow)

    if(screen_overflow < 400){
        iframe.style.right= ((-(r.right-relative.right)) - ((350 - screen_overflow)+50)) +'px';
    }
    else{
        iframe.style.right=-(r.right-relative.right)+'px';
    }

    let selectedWord = window.getSelection().toString().trim();

    iframe.src = chrome.extension.getURL("index.html")

    if(selectedWord.length > 1 && selectedWord!= ""){

        let message = {
            text : selectedWord
        };

        // iframe.style.border = "1px solid #000000"

        chrome.runtime.sendMessage(message, function(response) {
            // console.log(response.farewell);
            
            if(response.farewell == "got word selected"){

                if(iframe.style.width == "0px"){
                    iframe.style.width="350px";
                }
                else{
                    iframe.style.width="0px";
                }
            }

        });
    }
    
    document.body.appendChild(iframe);
    
}


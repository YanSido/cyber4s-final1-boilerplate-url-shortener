(()=>{const e="https://cryptic-bastion-17430.herokuapp.com";function t(e){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)}function n(e){document.getElementById("url_input").style.borderColor="red";let t=document.createElement("p");t.innerText=e,t.setAttribute("id","validationMessage"),t.style.color="red",document.getElementById("url_input").parentNode.appendChild(t)}function d(){document.getElementById("validationMessage")&&(document.getElementById("validationMessage").remove(),document.getElementById("url_input").style.borderColor="black")}function l(){document.getElementById("NewShortUrl")&&(document.getElementById("NewShortUrl").remove(),document.getElementById("url_input").style.borderColor="black")}function o(){document.getElementById("urlInfo")&&document.getElementById("urlInfo").remove()}document.getElementById("short-btn").addEventListener("click",(()=>{o(),l(),d(),t(document.getElementById("url_input").value)?(async t=>{let d="";try{const l={username:document.getElementById("username-input").value,"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};if(d=await axios({method:"post",url:`${e}/api/shorturl/new`,headers:l,data:{url:t}}),"already has this URL shorted"===d.data)n("You already shorted this URL");else{let e=d.data;e=e.split("/"),e=e.pop(),function(e){document.getElementById("url_input").style.borderColor="black";let t=document.createElement("p");t.innerText=e,t.setAttribute("id","NewShortUrl"),t.style.color="black",document.getElementById("url_input").parentNode.appendChild(t)}(e)}}catch(e){throw e}})(document.getElementById("url_input").value):n("Invalid URL")})),document.getElementById("view-details").addEventListener("click",(()=>{o(),l(),d(),t(document.getElementById("url_input").value)?n("Invalid URL"):(async t=>{let n="";try{const d={username:document.getElementById("username-input").value,"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};n=await axios({method:"get",url:`${e}/api/statistic/${t}`,headers:d}),function(e){let t=document.createElement("div");t.setAttribute("id","urlInfo");let n=document.createElement("p"),d=document.createElement("p"),l=document.createElement("p"),o=document.createElement("p"),r=e[Object.keys(e)[0]].newUrl;r=r.split("/"),r=r.pop(),n.innerText=`URL: ${Object.keys(e)[0]}`,d.innerText=`Shorted URL: ${r}`,l.innerText=`Shorted URL Clicked: ${e[Object.keys(e)[0]].urlClicked}`,o.innerText=`Date Created: ${e[Object.keys(e)[0]].dateCreated}`,t.appendChild(n),t.appendChild(d),t.appendChild(l),t.appendChild(o),document.getElementById("url_input").parentNode.appendChild(t)}(n.data)}catch(e){throw e}})(document.getElementById("url_input").value)}))})();
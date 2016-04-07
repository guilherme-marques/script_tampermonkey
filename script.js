// ==UserScript==
// @name         TESTE
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.apptopia.com/reports/charts?store=google_play&country=BR&category=98
// @grant        none
// @grant        GM_xmlhttpRequest
// ==/UserScript==
//CONSTANTS
streakUserAPI = "5a4febe0f1ec481b9cb9e2bb2f1d0831"; // ATENCAO !! Subistiuir pela sua DEVELOPER KEY do Streak !!!!!!!!!!!!!!!!!!
streakUserAPIHash = {denyson: "06de197ef9c24b19adc85b52032dac5f", felipe: "ae354e8f14e2433ba79b43cc9b523854"};
publisherPipelineKey = "agxzfm1haWxmb29nYWVyLgsSDE9yZ2FuaXphdGlvbiIHdWJlZS5pbgwLEghXb3JrZmxvdxiAgICA5L-ZCgw";
publisherPipelineFields = { publisherPipelineKey: { appName:  1003,
                                                   publisherEmail: 1004,
                                                   language: 1001,
                                                   audience: 1002,
                                                   link: 1006 }};
streakPipelineKey = "06de197ef9c24b19adc85b52032dac5f";
streakWaitingButton = 'class="tampermonkey streak waiting">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: grey;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Loading...</span>    </button>    </span>  </span>';
streakExistsButton = 'class="tampermonkey streak exists">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: blue;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>On Streak!</span>    </button>    </span>  </span>';
streakAddButton = 'class="tampermonkey streak add">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: orange;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Add to Streak</span>    </button>    </span>  </span>';
streakFailedButton = 'class="tampermonkey streak fail">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: red;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Failed to Add</span>    </button>    </span>  </span>';
fails_attempt = 3;
boxKey = "";

function AddButtonId(id,button){
    var temp = '<span id=\"'+id+'\" ';
    return temp+button;
}

//END CONSTANTS
//BEGIN GMREQUESTS
function GMRequest(url, method, headers, accept, data, __callback) {
    headers = typeof headers !== 'undefined' ? headers : {};
    accept = typeof accept !== 'undefined' ? accept : 'text/html';
    data = typeof data !== 'undefined' ? data : {};
    GM_xmlhttpRequest ( {
        method: method,
        headers: headers,
        url: encodeURI(url),
        data: data,
        accept: accept,
        onreadystatechange: function (response) {
            if (response.readyState != 4)
                return;
            global2 = response;
            global = response.responseText;
            __callback(JSON.parse(response.responseText));
        }
    } );
}
function streakGet(url, callback) {
  GMRequest(url, "GET", { Authorization: "Basic "+btoa(streakUserAPI+":")+"=="}, 'application/json', undefined, callback);
}
function streakPut(url, data, callback) {
  GMRequest(url, "PUT", { Authorization: "Basic "+btoa(streakUserAPI+":")+"=="}, 'application/json', data, callback);
}
function streakPost(url, data, callback) {
  headers = { Authorization: "Basic "+btoa(streakUserAPI+":")+"==" };
  headers["Content-Type"] = 'application/json';
  GMRequest(url, "POST", headers, 'application/json', data, callback);
}
//END GMREQUESTS
//PAGE BUTTONS
function wipeStreakButton() {
  $(".tampermonkey.streak").remove();
}
function plotStreakButton(button, indice) {
  //wipeStreakButton();
  console.log("indice = "+indice);
  $($(".app-link-publisher")[indice]).append(AddButtonId(indice,button));
  indice = indice + 1;
}
function plotStreakWaitingButton(indice) {
  plotStreakButton(streakWaitingButton,indice);
  $(".streak.waiting").click(function(event){
    event.stopPropagation();
  });
}
function plotStreakExistsButton(indice) {
  plotStreakButton(streakExistsButton,indice);
  $(".streak.exists").click(function(event){
    event.stopPropagation();
    //updatePublisherToStreak();
  });
}
function plotStreakAddButton(indice) {
  plotStreakButton(streakAddButton,indice);
  $(".streak.add").click(function(event){
    event.stopPropagation();
    //addPublisherToStreak();
  });
}
function plotStreakFailedButton(indice) {
  plotStreakButton(streakFailedButton,indice);
  $(".streak.fail").click(function(event){
    event.stopPropagation();
  });
  setTimeout(plotStreakAddButton, 3000);
}
//END PAGE BUTTONS
//BEGIN STREAK
function publisherExists(name, callback) {
  console.log("https://www.streak.com/api/v1/search?query="+name.replace(",","").split(' ').slice(0,2).join(' '));
  var result = streakGet("https://www.streak.com/api/v1/search?query="+name.replace(",","").split(' ').slice(0,2).join(' '), callback);
}
//END STREAK
//BEGIN INIT
function init(){
  console.log("iniciou");
  started = false;
  finished = [];
  //plotStreakWaitingButton();
  var todos_links = $(".app-link-publisher a");
  for (var i = 0, len = todos_links.length; i < len; i += 1) {
    finished[i] = false;
    (function(i) {
        setInterval(function() {
            if($("td.txt").length > 0 && finished[i] === false) {
                started = true;
                console.log("for "+i +" started = "+started);
                var publisherName = todos_links[i].title;
                console.log("log  = "+publisherName);
                publisherExists(publisherName, function(result){
                    var results = result.results.filter(function(box) {
                        return box.name == publisherName;
                    });
                    console.log("chegou aqui");
                    if (results.length > 0) {
                        boxKey = results[i].boxKey;
                        plotStreakExistsButton(i);
                    } else {
                        plotStreakAddButton(i);
                    }
                });
                finished[i] = true;
                }
        }, 1000);
    })(i);
  }
}
//END INIT
setInterval(function(){
  if ($(".tampermonkey").length === 0) {
    started = false;
  }
},5000);

$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '100'){
      streakUserAPI = streakUserAPIHash.denyson;
    } else if (keycode == '102') {
      streakUserAPI = streakUserAPIHash.felipe;
    }
});
init();
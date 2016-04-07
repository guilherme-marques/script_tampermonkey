// ==UserScript==
// @name         Google Play to Streak
// @namespace    http://your.homepage/
// @version      0.2
// @description  enter something useful
// @author       You
// @match        play.google.com/*
// @grant        none
// @grant        GM_xmlhttpRequest
// ==/UserScript==
//TODO
//BEGIN CONSTANTS
streakUserAPI = "5a4febe0f1ec481b9cb9e2bb2f1d0831"; // ATENCAO !! Subistiuir pela sua DEVELOPER KEY do Streak !!!!!!!!!!!!!!!!!!
streakUserAPIHash = {denyson: "06de197ef9c24b19adc85b52032dac5f", felipe: "ae354e8f14e2433ba79b43cc9b523854"};
publisherPipelineKey = "agxzfm1haWxmb29nYWVyLgsSDE9yZ2FuaXphdGlvbiIHdWJlZS5pbgwLEghXb3JrZmxvdxiAgICA5L-ZCgw";
publisherPipelineFields = { publisherPipelineKey: { appName:  1003,
                                                   publisherEmail: 1004,
                                                   language: 1001,
                                                   audience: 1002,
                                                   link: 1006 }};
streakPipelineKey = "06de197ef9c24b19adc85b52032dac5f";
streakWaitingButton = '<span class="tampermonkey streak waiting">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: grey;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Loading...</span>    </button>    </span>  </span>';
streakExistsButton = '<span class="tampermonkey streak exists">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: blue;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>On Streak!</span>    </button>    </span>  </span>';
streakAddButton = '<span class="tampermonkey streak add">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: orange;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Add to Streak</span>    </button>    </span>  </span>';
streakFailedButton = '<span class="tampermonkey streak fail">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: red;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Failed to Add</span>    </button>    </span>  </span>';
fails_attempt = 3;
boxKey = "";
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
//BEGIN PAGE FUNCTIONS
function wipeStreakButton() {
  $(".tampermonkey.streak").remove();
}
function plotStreakButton(button) {
  wipeStreakButton();
  $(".details-actions-right").append(button);
}
function plotStreakWaitingButton() {
  plotStreakButton(streakWaitingButton);
  $(".streak.waiting").click(function(event){
    event.stopPropagation();
  });
}
function plotStreakExistsButton() {
  plotStreakButton(streakExistsButton);
  $(".streak.exists").click(function(event){
    event.stopPropagation();
    updatePublisherToStreak();
  });
}
function plotStreakAddButton() {
  plotStreakButton(streakAddButton);
  $(".streak.add").click(function(event){
    event.stopPropagation();
    addPublisherToStreak();
  });
}
function plotStreakFailedButton() {
  plotStreakButton(streakFailedButton);
  $(".streak.fail").click(function(event){
    event.stopPropagation();
  });
  setTimeout(plotStreakAddButton, 3000);
}
function fetchPublisherName() {
  return removeSpecial($(".document-subtitle.primary span").text());
}
function fetchPublisherData() {
  data = {};
  data[publisherPipelineFields.publisherPipelineKey.appName] = removeSpecial($(".document-title div").text());
  data[publisherPipelineFields.publisherPipelineKey.publisherEmail] = $(".dev-link").filter(function(){return $(this).attr('href').indexOf('@') > 0;}).first().attr('href').replace('mailto:','');
  data[publisherPipelineFields.publisherPipelineKey.audience] = rankAudience(Number(($("[itemprop='numDownloads']").text().match(/(.*) -/)[1]).replace(/\./g,"")));
  data[publisherPipelineFields.publisherPipelineKey.link] = window.location.href;
  return data;
}
function rankAudience(number) {
  if (number < 100000) {
    return  "Baixa";
  } else if (number < 1000000 ) {
    return  "Media";
  } else {
    return  "Alta";
  }
}
function removeSpecial(replace){
    var str_special = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    var str_nospecial = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    var new_string = "";
    for(var i=0; i<replace.length;i++){
        var idx = str_special.indexOf(replace.charAt(i));
        if(idx != -1){
            new_string += str_nospecial.charAt(idx);
        } else {
            new_string += replace.charAt(i);
        }
    }
    return new_string;
}

//END PAGE FUNCTIONS
//BEGIN Streak
function publisherExists(name, callback) {
  var result = streakGet("https://www.streak.com/api/v1/search?query="+name.replace(",","").split(' ').slice(0,2).join(' '), callback);
}
function addPublisherBox(callback) {
  publisherName = fetchPublisherName();
  streakPut("https://www.streak.com/api/v1/pipelines/"+publisherPipelineKey+"/boxes?name="+publisherName, undefined, callback);
}
function editPublisherBox(callback, boxKey) {
  publisherData = fetchPublisherData();
  $.each(publisherData, function (key, value) {
    streakPost("https://www.streak.com/api/v1/boxes/"+boxKey+"/fields/"+key, JSON.stringify({ value: value }), callback);
  });
}
function addPublisherToStreak() {
  var fails = 0;
  plotStreakWaitingButton();
  addPublisherBox(function(result) {
    if (typeof result.boxKey !== 'undefined') {
      editPublisherBox(function(result){
        if (typeof result.value !== 'undefined') {
          plotStreakExistsButton();
        } else {
          fails += 1;
          if (fails == 3) {
            plotStreakFailedButton();
          }
        }
      }, result.boxKey);
    } else {
      plotStreakFailedButton();
    }
  });
}
function updatePublisherToStreak() {
  var fails = 0;
  plotStreakWaitingButton();
  editPublisherBox(function(result){
    if (typeof result.value !== 'undefined') {
      plotStreakExistsButton();
    } else {
      fails += 1;
      if (fails == 3) {
        plotStreakFailedButton();
      }
    }
  }, boxKey);
}
//END Streak
//BEGIN INIT
function init() {
  started = false;
  plotStreakWaitingButton();
  interval = setInterval(function(){
                if($(".info-box-bottom").length > 0 && started === false) {
                  var publisherName = $(".document-subtitle.primary span").text();
                  started = true;
                  publisherExists(publisherName, function(result){
                    var results = result.results.filter(function(box) {
                      return box.name == publisherName;
                    });
                    if (results.length > 0) {
                      boxKey = results[0].boxKey;
                      plotStreakExistsButton();
                    } else {
                      plotStreakAddButton();
                    }
                  });
                }
              },1000);
}
//END INIT
setInterval(function(){
  if ($(".tampermonkey").length === 0) {
    started = false;
  }
},1000);
$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '100'){
      streakUserAPI = streakUserAPIHash.denyson;
    } else if (keycode == '102') {
      streakUserAPI = streakUserAPIHash.felipe;
    }
});
init();

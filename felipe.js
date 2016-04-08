// ==UserScript==
// @name         Apptopia Validation
// @namespace    http://your.homepage/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.apptopia.com/reports/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==


streakUserAPI = "ae354e8f14e2433ba79b43cc9b523854";
streakPipelineKey = "06de197ef9c24b19adc85b52032dac5f";
streakWaitingButton = '<span class="tampermonkey streak waiting">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: grey;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Loading...</span>    </button>    </span>  </span>';
streakExistsButton = '<span class="tampermonkey streak exists">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: blue;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>On Streak!</span>    </button>    </span>  </span>';
streakAddButton = '<span class="tampermonkey streak add">  <span class="apps large play-button buy-button-container" data-doc-fetch-skip-cache="0" data-doc-fetch-vouchers="0" data-docid="com.skillab.njrquest"> <div class="pon" style="display:none">1</div> <button style="background-color: orange;" class="price buy id-track-click" data-server-cookie="CAIaHgocEhoKFGNvbS5za2lsbGFiLm5qcnF1ZXN0EAEYAw==" data-uitype="221"> <span> <span itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"> <meta content="https://play.google.com/store/apps/details?id=com.skillab.njrquest&amp;rdid=com.skillab.njrquest&amp;rdot=1&amp;feature=md" itemprop="url"> <meta content="" itemprop="previewUrl"> <meta content="" itemprop="offerType"> <meta content="0" itemprop="price"> <meta content="" itemprop="description"> <span itemprop="seller" itemscope="itemscope" itemtype="http://schema.org/Organization"> <meta content="Android" itemprop="name"> </span> </span> </span>     <jsl jsl="$x 1;$t t-nH6Xd1T8X0Y;$x 0;"> <jsl jsl="$x 1;$t t-R7hS--kHwck;$x 0;"> <span jsl="$x 1;" style="display:none" jsan="5.display"></span> </jsl> </jsl>    <span>Not On Streak!</span>    </button>    </span>  </span>';

//------------------------- BUTTON STUFF --------------------------------------------------------------
function buttonPlotting(button, coord){
    wipeButton(coord);
    $($(".app-link-publisher")[coord]).append(button);
}

function plotExists(coord){
    buttonPlotting(streakExistsButton, coord);
}

function plotNot(coord){
    buttonPlotting(streakAddButton, coord);
}

function plotWait(coord){
    buttonPlotting(streakWaitingButton, coord);
}

function wipeButton(coord){
    $($(".tampermonkey.streak")[coord]).remove();
}
//------------------------- END OF BUTTON STUFF ---------------------------------------------------------

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

function doRequest(coord, callback){
    var name = $($($(".app-link-publisher")[coord]).children()[0]).text();
    var result = streakGet("https://www.streak.com/api/v1/search?query="+name.replace(",","").split(' ').slice(0,2).join(' '), callback);
}


console.log("comecou");
(function() {
    for(var i =0; i<$(".app-link-publisher").length; i++){
        plotWait(i);
        console.log("1");
    }
    for(var c =0; c<$(".app-link-publisher").length; c++){
        (function(c){
        console.log("coord");
        doRequest(c, function(result){
            console.log(c);
            console.log(result.results.length > 0);
            if (result.results === 0){
                plotNot(c);
            }else {
                plotExists(c);
            }
        });})(c);
    }
})();
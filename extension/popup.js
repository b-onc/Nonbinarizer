/**
 * Created by Bahadir on 4.07.2017.
 */
"use strict";

window.onload = popupReady;

function popupReady(){

    var nonbinarized = false;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "send-stats"});
        document.getElementById("nonbinarize-div").onclick = function () {
            if(!nonbinarized){
                chrome.tabs.sendMessage(activeTab.id, {"message": "nonbinarize-page"});
            } else {
                //reload page
                chrome.tabs.reload(activeTab.id);
                window.close();
            }
        };
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "nonbinarize-complete" ) {
                changeUI(request.count);
                nonbinarized = true;
            }
            if( request.message === "stats-sent" ){
                nonbinarized = request.status;
                if(nonbinarized) {
                    changeUI(request.count);
                }
            }
        }
    );
}

function changeUI(count){
    document.getElementById("stat-label").innerText = count;
    document.getElementById("nonbinarize-label").innerText = "Click to revert back :(";
}

/**
 * Created by Bahadir on 4.07.2017.
 */
"use strict";

window.onload = popupReady;

function popupReady(){
    var nonbinarized = localStorage.getItem("nonbinarized") ? localStorage.getItem("nonbinarized") : "false";
    if(nonbinarized === "true") {
        changeUI();
    }
    document.getElementById("nonbinarize-div").onclick = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            if(nonbinarized === "false"){
                chrome.tabs.sendMessage(activeTab.id, {"message": "nonbinarize-page"});
            } else {
                //reload page
                localStorage.setItem("nonbinarized","false");
                localStorage.setItem("count","0");
                chrome.tabs.reload(activeTab.id);
                window.close();
            }

        });
    };
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "nonbinarize-complete" ) {
                document.getElementById("stat-label").innerText = request.count;
                document.getElementById("nonbinarize-label").innerText = "Click to revert back :(";
                nonbinarized = "true";
                localStorage.setItem("nonbinarized","true");
                localStorage.setItem("count",""+request.count);
            }
        }
    );
}

function changeUI(){
    document.getElementById("stat-label").innerText = localStorage.getItem("count");
    document.getElementById("nonbinarize-label").innerText = "Click to revert back :(";
}

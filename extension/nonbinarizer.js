/**
 * Created by Bahadir on 3.07.2017.
 */
"use strict";

var nonbinarized = false;
var count = 0;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "nonbinarize-page" ) {
            count = nonbinarizePage();
            nonbinarized = true;
            chrome.runtime.sendMessage({"message": "nonbinarize-complete", "count": count});
        }
        if( request.message === "send-stats" ) {
            chrome.runtime.sendMessage({"message": "stats-sent", "count": count, "status": nonbinarized});
        }
    }
);

function nonbinarizePage(){
    var elements = "p, h1, h2, h3, h4, span, a";
    var total = 0;
    var children = $(elements);
    children.each(function(i){
        total += changeText(this);
    });
    return total;
}

function changeText(el) {
    var that = $(el);
    var text = that.html();
    var nonbinarized = nonbinarize(text);
    if(text !== nonbinarized){
        that.html(nonbinarized);
        return 1;
    }
    return 0;
}

function nonbinarize(text){
    var g = "g";
    var re = new RegExp("\\bHe\\b|\\bShe\\b",g);
    text = text.replace(re,"Ze");
    re = new RegExp("\\bhe\\b|\\bshe\\b",g);
    text = text.replace(re,"ze");
    re = new RegExp("\\bHim\\b|\\bHer\\b",g);
    text = text.replace(re,"Zir");
    re = new RegExp("\\bhim\\b|\\bher\\b",g);
    text = text.replace(re,"zir");
    re = new RegExp("\\bHis\\b|\\bHer\\b",g);
    text = text.replace(re,"Zir");
    re = new RegExp("\\bhis\\b|\\bher\\b",g);
    text = text.replace(re,"zir");
    re = new RegExp("\\bHis\\b|\\bHers\\b",g);
    text = text.replace(re,"Zirs");
    re = new RegExp("\\bhis\\b|\\bhers\\b",g);
    text = text.replace(re,"zirs");
    re = new RegExp("\\bHimself\\b|\\bHerself\\b",g);
    text = text.replace(re,"Zieself");
    re = new RegExp("\\bhimself\\b|\\bherself\\b",g);
    text = text.replace(re,"zieself");
    re = new RegExp("\\bMan\\b|\\bWoman\\b",g);
    text = text.replace(re,"Person");
    re = new RegExp("\\bman\\b|\\bman\\b",g);
    text = text.replace(re,"person");
    re = new RegExp("\\bMen\\b|\\bWomen\\b",g);
    text = text.replace(re,"People");
    re = new RegExp("\\bmen\\b|\\bmen\\b",g);
    text = text.replace(re,"people");
    re = new RegExp("\\bMr\\.(?!\\S)|\\bMrs\\.(?!\\S)|\\bMs\\.(?!\\S)",g);
    text = text.replace(re,"Mx.");
    return text;
}
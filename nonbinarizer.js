/**
 * Created by Bahadir on 3.07.2017.
 */
"use strict";

console.log("extension loaded");

var elements = "p, h1, h2, h3, h4, span, a";

var children = $(elements);
children.each(function(i){
    changeText(this);
    /*
    if($(this).children(elements).length == 0){
        changeText(this);
    }
    $(this).children(elements).each(function (j) {
        changeText(this);
    });*/
});

function changeText(el) {
    var that = $(el);
    var text = that.html();
    var nonbinarized = nonbinarize(text);
    if(text !== nonbinarized){
        console.log("---change found---");
        that.html(nonbinarized);
    }
}

function nonbinarize(text){
    var g = "g";
    var re = new RegExp("\\bHe\\b|\\bShe\\b",g);
    text = text.replace(re,"Zie");
    re = new RegExp("\\bhe\\b|\\bshe\\b",g);
    text = text.replace(re,"zie");
    re = new RegExp("\\bHim\\b|\\bHer\\b",g);
    text = text.replace(re,"Zim");
    re = new RegExp("\\bhim\\b|\\bher\\b",g);
    text = text.replace(re,"zim");
    re = new RegExp("\\bHis\\b|\\bHer\\b",g);
    text = text.replace(re,"Zir");
    re = new RegExp("\\bhis\\b|\\bher\\b",g);
    text = text.replace(re,"zir");
    re = new RegExp("\\bHis\\b|\\bHers\\b",g);
    text = text.replace(re,"Zis");
    re = new RegExp("\\bhis\\b|\\bhers\\b",g);
    text = text.replace(re,"zis");
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
    return text;
}
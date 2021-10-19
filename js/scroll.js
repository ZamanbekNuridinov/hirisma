"use strict"

let html = document.documentElement,
    body = document.body,
    progressLine = document.querySelector('.navbar-progress'),
    header = document.querySelector("header"),
    lastScroll = 0, savedHeight = 0;

document.addEventListener('scroll', function() {
    let hst = html["scrollTop"];
    let scroll = ( hst || body["scrollTop"] ) / ( (html["scrollHeight"] || body["scrollHeight"] ) - html.clientHeight) * 100;
    progressLine.style.setProperty('--scroll', scroll + '%');
    

    if (hst > 100){
        header.classList.add("downplay");
        if (lastScroll < hst)
            lastScroll = hst;
        if (lastScroll - hst >= 20){ //up
            if ((savedHeight == 0) || (savedHeight > hst)) savedHeight = hst;
        }
        if ( (hst - savedHeight >= 20) && (savedHeight != 0)) //down
            savedHeight = 0;
    } else { header.classList.remove("downplay"); }
});
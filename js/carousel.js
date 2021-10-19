"use strict"

let carousel = document.querySelector('.teamMembers-carousel');
let prevButton = document.querySelector('#teamMembers-carousel-previous-button');
let nextButton = document.querySelector('#teamMembers-carousel-next-button');
let teamNameLabel = document.querySelector('#memberName');
let centerTeam = carousel.querySelector('.teamMembers-carousel-center img');
let allTeam = Array.from(carousel.querySelectorAll('div img'));

let cellCount = 6;
let selectedIndex = 0;
let shift = 5;

teamNameLabel.innerHTML = centerTeam.dataset.name;

function rotateCarousel(isLeft) {
    let angle = selectedIndex / cellCount * -360;
    carousel.style.transform = `rotateY(${angle}deg)`;

    let images = Array.from(carousel.querySelectorAll('div'));

    if (isLeft){
        let first = returClassnIfHas(images[0]);
        let last = images[images.length-1];

        for (let i = 0; i < images.length - 1; i++){
            let target = images[i];
            let temp = images[i+1];
            giveClassFromTo(temp, target);
        }

        fillClassBy(last, first);
    } else {
        let last = returClassnIfHas(images[images.length-1]);
        let first = images[0];

        for (let i = images.length - 1; i > 0; i--){
            let target = images[i];
            let temp = images[i-1];
            giveClassFromTo(temp, target);
        }

        fillClassBy(first, last);
    }
    centerTeam = carousel.querySelector('.teamMembers-carousel-center img');
    teamNameLabel.innerHTML = centerTeam.dataset.name;
    readFile('File:\\\C:/Users/arman/Desktop/WEB/Pages/PSD/Dart_Service_Manager/text/Sophie.txt');
}

function giveClassFromTo(objectA, objectB){
    if (objectA.classList.length != 0){
        let clsA = objectA.classList[0];
        for (let clsB of objectB.classList)
            objectB.classList.remove(clsB);
        objectB.classList.add(clsA);
    }
}
function returClassnIfHas(object){
    return object.classList.length > 0 ? object.classList[0] : "";
}
function fillClassBy(object, clss){
    if (object.classList.length > 0){
        for (let cls of object.classList)
            object.classList.remove(cls);
    }
    object.classList.add(clss);
}

prevButton.addEventListener('click', () => {
    selectedIndex--;
    rotateCarousel(true);
});

nextButton.addEventListener('click', () => {
    selectedIndex++;
    rotateCarousel(false);
});

allTeam.forEach(team => {
    let parent = team.parentNode;
    team.addEventListener('click', (event) => {
        if (parent.classList.contains('teamMembers-carousel-right')){
            selectedIndex++;
            rotateCarousel(false);
            if (event.isTrusted)
                nextButton.dispatchEvent(new Event('mouseout'));
        } else if (parent.classList.contains('teamMembers-carousel-left')) {
            selectedIndex--;
            rotateCarousel(true);
            if (event.isTrusted)
                prevButton.dispatchEvent(new Event('mouseout'));
        }
    });

    let moving = false;

    team.addEventListener('mouseover', (event) => {
        if (!moving){
            if (parent.classList.contains('teamMembers-carousel-right')){
                if (event.isTrusted)
                    nextButton.dispatchEvent(new Event('mouseover'));
                let current = Number(carousel.style.transform.slice(8, -4)) - shift;
                carousel.style.transform = `rotateY(${current}deg)`;
            } else if (parent.classList.contains('teamMembers-carousel-left')){
                if (event.isTrusted)
                    prevButton.dispatchEvent(new Event('mouseover'));
                let current = Number(carousel.style.transform.slice(8, -4)) + shift;
                carousel.style.transform = `rotateY(${current}deg)`;
            }
        }
    });
    team.addEventListener('mouseout', (event) => {
        if (!moving){
            if (parent.classList.contains('teamMembers-carousel-right')){
                if (event.isTrusted)
                    nextButton.dispatchEvent(new Event('mouseout'));
                let current = Number(carousel.style.transform.slice(8, -4)) + shift;
                carousel.style.transform = `rotateY(${current}deg)`;
            } else if (parent.classList.contains('teamMembers-carousel-left')){
                if (event.isTrusted)
                    prevButton.dispatchEvent(new Event('mouseout'));
                let current = Number(carousel.style.transform.slice(8, -4)) - shift;
                carousel.style.transform = `rotateY(${current}deg)`;
            }
        }
        team.dispatchEvent(new Event('transitionend'));
    });
    team.addEventListener('transitionend', () => {
        moving = false
        let current = Number(carousel.style.transform.slice(8, -4));
        if (current % 60 != 0){
            let flag_a = current - 1;
            let flag_b = current + 1;
            do {
                flag_a--;
                flag_b++;
            } while (!(!(flag_a % 60 != 0) || !(flag_b % 60 != 0)))
            current = flag_a % 60 == 0 ? flag_a : flag_b;
            carousel.style.transform = `rotateY(${current}deg)`;
        }
    });
    team.addEventListener('transitionstart', () => {
        moving = true
    });
});


nextButton.addEventListener('mouseover', (event) => {
    nextButton.style.transform = "scale(1.3)";
    nextButton.style.opacity = "1";
    if (event.isTrusted)
        carousel.querySelector('.teamMembers-carousel-right img').dispatchEvent(new Event('mouseover'));
});
nextButton.addEventListener('mouseout', (event) => {
    nextButton.style.transform = "scale(1)";
    nextButton.style.opacity = ".7";
    if (event.isTrusted)
        carousel.querySelector('.teamMembers-carousel-right img').dispatchEvent(new Event('mouseout'));
});
prevButton.addEventListener('mouseover', (event) => {
    prevButton.style.transform = "scale(1.3)";
    prevButton.style.opacity = "1";
    if (event.isTrusted)
        carousel.querySelector('.teamMembers-carousel-left img').dispatchEvent(new Event('mouseover')); 
});
prevButton.addEventListener('mouseout', (event) => {
    prevButton.style.transform = "scale(1)";
    prevButton.style.opacity = ".7";
    if (event.isTrusted)
        carousel.querySelector('.teamMembers-carousel-left img').dispatchEvent(new Event('mouseout'));
});
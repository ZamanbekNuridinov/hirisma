"use strict"

document.addEventListener('click', e => {
    //Dropdown actions
    try{
        let isDropdownButton = e.target.matches("[data-dropdown-button]");
        if (e.target.parentElement != null){
            if (e.target.parentElement.matches("[data-dropdown-button]"))
                isDropdownButton = e.target.parentElement.matches("[data-dropdown-button]");
        }
        
        if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

        let currentDropdown;
        if (isDropdownButton) {
            currentDropdown = e.target.closest("[data-dropdown]");
            currentDropdown.classList.toggle("active");
        }
            
        document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
            if (dropdown === currentDropdown ) return;
            dropdown.classList.remove("active");
        })
    } catch{}
    //-----------------------
})


//Animation of authentification window's elements
let authDropdown = document.querySelector(".dropdown-auth");
let authDropdownHeadings = authDropdown.querySelectorAll("h4[data-placeholder]");
let authDropdownInputs = authDropdown.querySelectorAll(".fill-in-container input").forEach((authDropdownInput, index) => {
    authDropdownInput.addEventListener("focus", () => {
        authDropdownHeadings[index].style.transform = "translateY(-15px)";
        authDropdownHeadings[index].style.fontSize = "12px";
    });
    authDropdownInput.addEventListener("focusout", () => {
        if (authDropdownInput.value.length == 0){
            authDropdownHeadings[index].style.transform = "translateY(0px)";
            authDropdownHeadings[index].style.fontSize = "16px";
        }
        
    })
});

let userTypes = authDropdown.querySelectorAll(".userType").forEach((unit, index) => {
    unit.addEventListener("click", e => {
        document.querySelectorAll(".userSelector .userType").forEach(element => {
            element.classList.remove("selected");
        });
        if (unit === e.target) unit.classList.add("selected");

        let underline = document.querySelector(".userSelector > .underline");
        underline.setAttribute("data-selected-user",
        underline.getAttribute("data-selected-user") == "Student" ?
        "Teacher" : "Student"
        );
    })
})
//-------------------------------
window.addEventListener('resize', function(event) {
    resizeIframe('.intro iframe');
}, true);

let passwordEye = document.querySelector(".dropdown-auth .password-container > i");
passwordEye.addEventListener("click", () => {
    passwordEye.classList.toggle("fa-eye");
    passwordEye.classList.toggle("fa-eye-slash");
    let passwordFill = document.getElementById("passwordFill");
    passwordFill.type = passwordFill.type == "password" ? "text" : "password";
})

$(document).ready(() => {
    $('.comments').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 750,
        vertical: true,
        verticalSwiping: true,
    });

    resizeIframe('.intro iframe');

    let titles = document.querySelectorAll(".titles-container .title");
    titles.forEach((title) => {
        title.addEventListener("click", (event) => {
            event.preventDefault();
        })
    })
});

function resizeIframe(selector){
    $(selector).css("height", () => {
        let width = $(selector).css('width');
        return Number.parseInt(width.substring(0, width.length-2)*9/16);
    })
}

let slides = Array.from(document.getElementsByClassName("slide"));

$(".slide-content").hide();

$(document).ready(function(){
    $(".slide").children(".slide-header").click(function() {
        $(".slide").children(".slide-content").slideUp("1000");
        $(".slide").children(".slide-header").css("background-color", "rgb(236, 236, 236)");
        parent = $(this.parentNode);
        if (parent.children(".slide-content").is(":visible")){
            parent.children(".slide-content").slideUp("1000");
            $(this).css("background-color", "rgb(236, 236, 236)");
        }
        else{
            parent.children(".slide-content").slideToggle("1000");
            $(this).css("background-color", "rgb(255, 255, 255)");
        }
            
    });
});

slides.forEach(slide => {
    let slideHeader = Array.from(slide.getElementsByClassName("slide-header"))[0];
    let line = slide.querySelector("span");
    let slideTitle = Array.from(slide.getElementsByClassName("slide-title"))[0];
    let arrow = Array.from(slide.getElementsByClassName("fas"))[1];
    arrow.style.transform = arrow.style.transform? `rotate(${Number.parseInt(arrow.style.transform.slice(7))+180}deg)`: "rotate(0deg)";
    changeColorService(slideHeader)

    slideHeader.addEventListener("click", () => {
        changeColorService(slideHeader);
        line.style.opacity = line.style.opacity == "1"? "0": "1";
        slideTitle.style.transform = slideTitle.style.transform == "translateX(0px)"? "translateX(-200px)": "translateX(0px)";
        slideTitle.style.opacity = slideTitle.style.opacity == "1"? "0": "1";
        arrow.style.transform = arrow.style.transform? `rotate(${Number.parseInt(arrow.style.transform.slice(7))+180}deg)`: "rotate(0deg)";
    })
});

function changeColorService(slideHeader){
    slideHeader.style.backgroundColor = slideHeader.style.backgroundColor == "rgb(236, 236, 236)" ? "rgb(255, 255, 255)" : "rgb(236, 236, 236)";
}
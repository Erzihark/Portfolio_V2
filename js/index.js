//Slide ins
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);

//Sticky Nav
let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;

window.onscroll = () => {
    if (window.pageYOffset > sticky && window.innerWidth > 640){
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky")
    }
};
document.getElementById('navigator').onclick = () => {
    let mobileNav = document.querySelectorAll('.header-links');
    for (let i = 0; i < mobileNav.length; i++){
        if (mobileNav[i].classList.contains("mobile-nav")){
            mobileNav[i].classList.remove("mobile-nav");
        } else
            mobileNav[i].classList.add("mobile-nav");
    }
}

//Mobile nav
document.body.addEventListener('click', ()=>{
    let mobileNav = document.querySelectorAll('.header-links');
    if (mobileNav){
        for (let i = 0; i < mobileNav.length; i++){
            mobileNav[i].classList.remove("mobile-nav");
        }
    }
})

let except = document.getElementById('navigator');
except.addEventListener("click", (e)=>{
    e.stopPropagation();
}, false)

//Email form send
document.getElementById('smit').onclick = function(){
    let name = document.querySelectorAll('#form-name')[0].value;
    let email = document.querySelectorAll('#form-email')[0].value;
    let msg = document.querySelectorAll('#form-msg')[0].value;
    console.log(name, email, msg);
    fetch("https://formsubmit.co/ajax/manuelalejandrosac@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            message: msg,
            email: email
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            swal("Mail sent successfully");
        })
        .catch(error => {
            console.log(error);
            swal("Failed trying to send email, try again");
        });
}

//Carousel
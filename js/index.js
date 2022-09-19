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

//Portfolio Carousel

window.addEventListener('load', function () {
    setTimeout(()=>{
        const track = document.querySelector('.p-carousel-track');
        const slides = Array.from(track.children);
        const nxtBtn = document.querySelector('.p-carousel-btn_right');
        const prevBtn = document.querySelector('.p-carousel-btn_left');
        const dotsNav = document.querySelector('.p-carousel-nav');
        const dots = Array.from(dotsNav.children);
    
        const slideWidth = slides[0].getBoundingClientRect().width + 1;
        console.log(slideWidth);
    
        const setSlidePosition = (slide, index)=>{
            slide.style.left = slideWidth * index + "px";
        }
        slides.forEach(setSlidePosition);
        
        
    
        const moveToSlide = (track, currentSlide, targetSlide) =>{
            track.style.transform = "translateX(-" + targetSlide.style.left + ")";
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        }
        
        const updateDots = (currentDot, targetDot)=>{
            currentDot.classList.remove('current-slide');
            targetDot.classList.add('current-slide');
        }
        
        const toggleShowArrows = (slides, targetIdx, prevBtn, nxtBtn)=>{
            if(targetIdx === 0){
                prevBtn.classList.add('is-hidden');
                nxtBtn.classList.remove('is-hidden');
            } else if(targetIdx === slides.length - 1){
                prevBtn.classList.remove('is-hidden');
                nxtBtn.classList.add('is-hidden');
            } else {
                prevBtn.classList.remove('is-hidden');
                nxtBtn.classList.remove('is-hidden');
            }
        }
        
        prevBtn.addEventListener('click', e => {
            const currentSlide = track.querySelector(".current-slide");
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector(".current-slide");
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = slides.findIndex(slide => slide === prevSlide);
        
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            toggleShowArrows(slides, prevIndex, prevBtn, nxtBtn);
        })
        
        nxtBtn.addEventListener('click', e => {
            const currentSlide = track.querySelector(".current-slide");
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector(".current-slide");
            const nextDot = currentDot.nextElementSibling;
            const nextIndex = slides.findIndex(slide => slide === nextSlide);
        
            moveToSlide(track, currentSlide, nextSlide)
            updateDots(currentDot, nextDot);
            toggleShowArrows(slides, nextIndex, prevBtn, nxtBtn);
        })
        
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
        
            if(!targetDot) return;
        
            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIdx = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIdx];
        
            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
            toggleShowArrows(slides, targetIdx, prevBtn, nxtBtn);
        })
    }, 1000)
  })


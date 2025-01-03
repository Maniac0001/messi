

// Get the button
let mybutton = document.getElementById("scrollToTopBtn");

// Get the height of the hero section
let heroSection = document.querySelector('.hero'); // Assuming your hero section has the class "hero"

// When the user scrolls down, show the button only if passed the hero section
window.onscroll = function() {
    if (window.pageYOffset > heroSection.offsetHeight) {
        mybutton.classList.add("show");
    } else {
        mybutton.classList.remove("show");
    }
};

// When the user clicks on the button, scroll to the top
mybutton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

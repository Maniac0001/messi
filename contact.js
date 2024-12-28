// Smooth Scroll for Anchor Links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = anchor.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth"
    });
  });
});

// Button Hover Animation
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener("mouseenter", function () {
    button.style.transform = "scale(1.05)";
    button.style.transition = "transform 0.3s ease-in-out";
  });

  button.addEventListener("mouseleave", function () {
    button.style.transform = "scale(1)";
  });
});

// Scroll Animations: Animate Elements on Scroll
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

function checkVisibility() {
  elementsToAnimate.forEach(element => {
    const position = element.getBoundingClientRect();
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);

// Initial Check for Elements in View
checkVisibility();

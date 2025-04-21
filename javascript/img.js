var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  // for (i = 0; i < slides.length; i++) {
  //   slides[i].style.display = "none";  
  // }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000);
}


  // document.addEventListener("DOMContentLoaded", () => {
  //       const observer = new IntersectionObserver(entries => {
  //         entries.forEach(entry => {
  //           const bg = document.querySelector('.back-img');
  //           if (entry.isIntersecting) {
  //             bg.classList.add('show');
  //           } else {
  //             bg.classList.remove('show');
  //           }
  //         });
  //       }, {
  //         threshold: 0.5 
  //       });
    
  //       const target = document.querySelector('.container-three');
  //       observer.observe(target);
  //   });

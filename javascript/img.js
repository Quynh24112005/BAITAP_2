document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const bg = document.querySelector('.back-img');
        if (entry.isIntersecting) {
          bg.classList.add('show');
        } else {
          bg.classList.remove('show');
        }
      });
    }, {
      threshold: 0.5 // Khi 50% container-three xuất hiện
    });

    const target = document.querySelector('.container-three');
    observer.observe(target);
});


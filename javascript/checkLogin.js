window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const btnLogin = document.querySelector(".btn--login");
    const btnLogout = document.querySelector(".btn--logOut");

    if (!isLoggedIn) {

        if(btnLogin) btnLogin.style.display = "inline-block";
        if(btnLogout) btnLogout.style.display = "none";
        window.location.href = "login.html";
    }
    else {
        if(btnLogin) btnLogin.style.display = "none";
        if(btnLogout) btnLogout.style.display = "inline-block";
    }

    if(btnLogout){
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userLocal");
            window.location.href = "login.html";
        })
    }


  });
  
const formLogin = document.getElementById("formLogin");
const email = document.getElementById("email")
const password = document.getElementById("password")

window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      window.location.href = "index.html";
    }
  });
  

formLogin.addEventListener("submit",function(e){
    e.preventDefault();

    const userLocal = JSON.parse(localStorage.getItem("users") || "[]");

    const findUser = userLocal.find((user) => user.email === email.value 
        && user.password === password.value);

    if(!findUser){
        alert("Email hoặc mật khẩu không đúng!")
    }
    else{
        window.location.href="index.html";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userLogin", JSON.stringify(findUser));
    }
});

































// document.addEventListener('DOMContentLoaded', function() {

//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     if(!isLoggedIn) {
//         window.location.href ='https://pet-5-h-page.vercel.app/#'
//     }
//     else{
//         window.location.href='https://baitap-2-cveh.vercel.app/#trang-chu'
//     }
// });
// function check(form){
//     if (form.userid.vale == "lenhuquymh" && form.pwd.value == "123456"){
//         return true;
//     }
//     else{
//         alert("Incorrect Password or Username")
//         return false;
//     }
// }
// loginForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     // Xử lý đăng nhập, ví dụ nếu login thành công:
//     if(username === 'lenhuquynh' && password === '123456') {
//         localStorage.setItem('isLoggedIn', 'true');

//         // Chuyển trang sau khi set xong
//         window.location.href = 'https://baitap-2-cveh.vercel.app/#trang-chu';
//     } else {
//         alert('Sai thông tin!');
//     }
// });

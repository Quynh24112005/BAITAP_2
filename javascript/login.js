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

    const emailValue = email.value.trim();
    const passwordValue = password.value;
    if(!emailValue){
        alert("Email không được để trống")
    }
    if(!passwordValue){
        alert("Mật khẩu không được để trống")
    }

    login(emailValue,passwordValue);
});

async function login(emailValue,passwordValue) {
    try{
        const response = await fetch("https://baitap-2-1.onrender.com/user");
        const users = await response.json();

        const findUser = users.find((user) => user.email === emailValue.value 
                                        && user.password === passwordValue);

        if(!findUser){
            alert("Email hoặc mật khẩu không đúng!");
            return;
        }
        const result = {
            grandType: "Bearer",
            user: findUser
        };

        localStorage.setItem("isLoggedIn","true");
        localStorage.setItem("userLogin", JSON.stringify(result));

        window.location.href = "index.html";
    }

    catch(error){
        console.log("Lỗi khi login:",error);
        alert("Lỗi khi đăng nhập");
    };
}
        


































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

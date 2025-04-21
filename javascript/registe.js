// let apiUser = "http://localhost:3000/users"; 
// function login() {
//     getUser(Login);
// }

// function getUser(callback) {
//     fetch(apiUser)
//         .then(function (res) {
//             return res.json();
//         })
//         .then(callback);
// }

// function Login(data) {
//     let username = document.getElementById("username").value;
//     let password = document.getElementById("password").value;

//     data.forEach((user) => {
//         if (user.username === username && user.password === password) {
//             window.location.href = 'https://baitap-2-cveh.vercel.app/#trang-chu';
//         }
//     });
// }

// // lấy ra elements của trang
// const formRegister = document.getElementById("formRegister");
// const username = document.getElementById("userName");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const rePassword = document.getElementById("rePassword");
// // lắng nghe sự kiện

// formRegister.addEventListener("submit", function(e){
//     e.preventDefault();

//     //validate dữ liệu đầu vào
//     if(!username.value || !email.value || !password.value || !rePassword){
//         alert("Họ và tên không được để trống!")
//     }
//     if(!email.value){
//         alert("Email không được để trống!")
//     }
//     if(!password.value){
//         alert("Mật khẩu không được để trống!")
//     }
//     if(!rePassword){
//         alert("Mật khẩu xác nhận không được để trống!")
//     }

//     // kiểm tra password and rePassword
//     if(password.value !== rePassword.value){
//         alert("Mật khẩu không khớp!")
//     }
// });
const formRegister = document.getElementById("formRegister");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword");

formRegister.addEventListener("submit", function (e) {
  e.preventDefault();

  const dob = document.getElementById("dob").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!username.value.trim()) {
    alert("Họ và tên không được để trống!");
    return;
  }
  if (!email.value.trim()) {
    alert("Email không được để trống!");
    return;
  }
  if (!password.value) {
    alert("Mật khẩu không được để trống!");
    return;
  }
  if (!rePassword.value) {
    alert("Mật khẩu xác nhận không được để trống!");
    return;
  }
  if (!dob) {
    alert("Ngày sinh không được để trống!");
    return;
  }
  if (!gender) {
    alert("Giới tính không được để trống!");
    return;
  }
  if (!phone) {
    alert("Số điện thoại không được để trống!");
    return;
  }
  if (password.value !== rePassword.value) {
    alert("Mật khẩu không khớp!");
    return;
  }

  signUp(dob, gender, phone);
});

async function signUp(dobVal, genderVal, phoneVal) {
  const fullname = username.value.trim();

  const generatedUsername = fullname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "");

  const user = {
    username: generatedUsername,
    password: password.value,
    fullname: fullname,
    dob: dobVal,
    gender: genderVal,
    email: email.value.trim(),
    phone: phoneVal
  };

  try {
    const response = await fetch("https://68073bfbe81df7060eb94fab.mockapi.io/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Đăng ký thất bại");
      return;
    }

    alert("Đăng ký thành công!");

    formRegister.reset();
    window.location.href = "login.html";

  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu đăng ký:", error);
    alert("Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại sau.");
  }
}
 
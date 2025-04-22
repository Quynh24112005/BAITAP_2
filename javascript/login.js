const formLogin = document.getElementById("formLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value;

  if (!emailValue || !passwordValue) {
    alert("Email và mật khẩu không được để trống!");
    return;
  }

  login(emailValue, passwordValue);
});

async function login(emailValue, passwordValue) {
  try {
    const response = await fetch("https://68070264e81df7060eb88a78.mockapi.io/api/register/user");
    
    if (!response.ok) {
      throw new Error("Không thể kết nối đến server");
    }

    const users = await response.json();

    if (!Array.isArray(users)) {
      throw new Error("Dữ liệu người dùng không hợp lệ");
    }

    const user = users.find(
      (user) => user.email === emailValue && user.password === passwordValue
    );

    if (!user) {
      alert("Sai tên đăng nhập hoặc mật khẩu");
      return;
    }

    const result = {
      grantType: "Bearer",
      user: user
    };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userLogin", JSON.stringify(result));

    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
  }
}

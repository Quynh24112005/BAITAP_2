const formLogin = document.getElementById("formLogin");
const username = document.getElementById("username");
const password = document.getElementById("password");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value;

  if (!usernameValue || !passwordValue) {
    alert("Email và mật khẩu không được để trống!");
    return;
  }

  login(usernameValue, passwordValue);
});

async function login(usernameValue, passwordValue) {
  try {
    const response = await fetch("https://learning.oapi.vn/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          grantType: "Bearer",
          username: usernameValue,
          password: passwordValue
        })
      });
    

    const data = await response.json();

    if (!response.ok) {
      const message = data?.message || "Đăng nhập thất bại!";
      alert(message);
      return;
    }

    // Lưu token và user nếu cần
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userLogin", JSON.stringify(data));

    alert("Đăng nhập thành công");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
  }
}

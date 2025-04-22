const jsonServer = require("json-server");
const path = require("path"); // ✅ Thêm dòng này
const server = jsonServer.create();

// ✅ Dùng đường dẫn tuyệt đối để đảm bảo đúng file JSON
const router = jsonServer.router(path.join(__dirname, "database.json"));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// ✅ Custom API: /login
server.post("/login", (req, res) => {
  const { grantType, username, password } = req.body;

  if (grantType !== "Bearer") {
    return res.status(400).json({ message: "Loại xác thực không hợp lệ" });
  }

  const users = router.db.get("users").value();
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: "fake-token-" + user.id,
      user
    });
  } else {
    res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
  }
});

// ✅ Mount router vào /users (bắt buộc nếu bạn dùng JSON Server custom)
server.use("/users", router);

// ✅ Khởi động server
server.listen(process.env.PORT || 3000, () => {
  console.log("✅ JSON Server đang chạy.");
});

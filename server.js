// server.js
const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "database.json"));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom API: Đăng ký (POST /api/accounts/register)
server.post("/api/accounts/register", (req, res) => {
  const { username, password, fullname, dob, gender, email, phone } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
  }

  const users = router.db.get("users").value();
  const existed = users.find(u => u.username === username || u.email === email);

  if (existed) {
    return res.status(409).json({ message: "Tài khoản đã tồn tại" });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    fullname,
    dob,
    gender,
    email,
    phone
  };

  router.db.get("users").push(newUser).write();
  return res.status(201).json({ message: "Đăng ký thành công", user: newUser });
});

// Custom API: Đăng nhập (POST /api/auth/login)
server.post("/api/auth/login", (req, res) => {
  const { grantType, username, password } = req.body;

  if (grantType !== "Bearer") {
    return res.status(400).json({ message: "Kiểu grantType không hợp lệ" });
  }

  const users = router.db.get("users").value();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
  }

  return res.status(200).json({
    message: "Đăng nhập thành công",
    accessToken: "fake-token-" + user.id,
    user
  });
});

// Dữ liệu gốc
server.use("/api", router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("✅ JSON Server đang chạy tại cổng", PORT);
});

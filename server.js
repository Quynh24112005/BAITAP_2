const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();

const userRouter = jsonServer.router("database.json"); // API /users
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// ✅ /login lấy từ db.json
server.post("/login", (req, res) => {
  const { grantType, username, password } = req.body;

  if (grantType !== "Bearer") {
    return res.status(400).json({ message: "Loại xác thực không hợp lệ" });
  }

  // Đọc db.json (tách riêng với database.json)
  const dbData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const user = dbData.users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: "fake-token-" + user.id,
      user
    });
  } else {
    res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
  }
});

// ✅ Gắn route cho /users (từ database.json)
server.use("/users", userRouter);

// ✅ Khởi động server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🚀 Server chạy tại cổng " + PORT);
});

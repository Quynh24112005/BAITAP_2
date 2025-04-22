const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "database.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// API đăng nhập giả lập
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get("users").value();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({
      message: "Đăng nhập thành công",
      accessToken: "fake-token-" + user.id,
      user
    });
  } else {
    res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
  }
});

// Mount router mặc định (các API CRUD tự động)
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server đang chạy tại http://localhost:${PORT}`);
});

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("database.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post("/login", (req, res) => {
  const { grantType, username, password } = req.body;

  if (grantType !== "Bearer") {
    return res.status(400).json({ message: "Loại xác thực không hợp lệ" });
  }

  const users = router.db.get("users").value();
  const user = users.find(u => u.username === username && u.password === password);

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

server.use(router);
server.listen(process.env.PORT || 3000, () => {
  console.log("JSON Server đang chạy...");
});

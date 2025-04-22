const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Bắt buộc để json-server-auth hoạt động
server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth); // 🔐 auth phải nằm trước router
server.use(router);

// ✅ PORT bắt buộc phải lấy từ process.env để chạy trên Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server Auth đang chạy tại cổng ${PORT}`);
});

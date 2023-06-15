const express = require("express");
const app = express();
const port = 3000;
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

const connect = require("./schemas");
connect();

//미들웨어
app.use(express.json());

app.use("/posts", [postsRouter]);
app.use("/comments", [commentsRouter]);

app.get("/", (req, res) => {
  res.send("gesipan page");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 정상적으로 열렸습니다.");
});

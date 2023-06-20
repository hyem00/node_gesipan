const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");

const connect = require("./schemas");
connect();

//미들웨어
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("gesipan page");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 정상적으로 열렸습니다.");
});

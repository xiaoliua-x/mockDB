//1.导入express
const express = require("express");
//2.创建路由对象
const router = express.Router();
const client = require("../db/index");
const goods = require("../goods.json");
//3.挂载具体的路由
router.get("/user", (req, res) => {
  res.send("欢迎使用get方式访问！尝试一下改动~");
});
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let result = await client.col("goods").findOne({
    username,
  });
  if (!result) {
    client.col("goods").insertOne({
      username,
      password,
    });
    res.send({
      code: "200",
      msg: "注册成功",
    });
  } else {
    res.send({
      code: "500",
      msg: "用户已存在",
    });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let result = await client.col("goods").findOne({
    username,
  });

  if (!result) {
    res.send({
      code: "500",
      msg: "用户不存在",
    });
  } else {
    res.send({
      code: "200",
      msg: "登陆成功",
    });
  }
});

router.get("/shop", async (req, res) => {
  setTimeout(() => {
    res.json(goods);
  }, 1000);
});

router.post("/shop", async (req, res) => {
  const { books } = req.body;
  req.send({
    msg: "插入成功",
    code: "200",
  });
});

//向外导出路由对象
module.exports = router;

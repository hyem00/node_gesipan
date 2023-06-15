const express = require("express");
const router = express.Router();
const Post = require("../schemas/post.js");

// 전체 게시글 목록 조회 API
router.get("/", async (req, res) => {
  const allPosts = await Post.find();
  console.log(allPosts);
  allPosts.sort(function (prev, next) {
    if (prev.date > next.date) {
      return -1;
    } else if (prev.date == next.date) {
      return 0;
    } else if (prev.date < next.date) {
      return 1;
    }
  });
  if (!allPosts.length) {
    return res.status(404).json({
      errorMessage: "작성된 게시글이 없습니다.",
    });
  } else {
    return res.status(200).json({ posts: allPosts });
  }
});

// 게시글 작성 API
router.post("/", async (req, res) => {
  if (req.body.lenght < 0) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    // history.back()
  }
  const { user, password, title, content } = req.body;
  const newPost = await Post.create({
    user,
    password,
    title,
    content,
  });
  res.json({ newPost });
});

// 간단한 게시글 조회 API
router.get("/:postId", (req, res) => {
  const { postId } = req.params;
  if (!postId)
    return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다" });

  const [result] = Post.filter((p) => {
    Number(postId) === p.postId;
  });
  res.json({ data: result });
});

// 게시글 수정 API
router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password, user, title, content } = req.body;
  const postPw = await Post.find({ inpassword });
  if (postPw.length) {
    await Cart.updateOne(
      // 해당하는 값이 있으면
      { password: password },
      // 콘티티에 맞는 값으로 수정해주라
      { $set: { user: user } },
      { $set: { title: title } },
      { $set: { content: content } }
    );
  }
  res.status(200).json({ message: "게시글을 수정하였습니다" });
});

// 게시글 삭제 API
router.delete(":password", async (req, res) => {
  const { password } = req.params;
  const existsPw = await Post.find({ password });
  if (existsCarts.length) {
    await Post.deleteOne({ password });
  }
  res.status(200).json({ message: "게시글을 삭제하였습니다" });
});

module.exports = router;

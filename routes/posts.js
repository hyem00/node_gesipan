const express = require("express");
const router = express.Router();
const Post = require("../schemas/post.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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
  const { user, password, title, content } = req.body;
  if (req.body.lenght < 0 || !req.body) {
    throw new Error("작성할 게시물이 없습니다");
  }
  const newPost = await Post.create({
    user,
    password,
    title,
    content,
  });
  res.json({ newPost });
});

// 간단한 게시글 상세 조회 API
router.get("/:id", async (req, res) => {
  console.log("들어는 왔다");
  const { id } = req.params;
  let result = {};
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  } else {
    result = await Post.findOne({ _id: id });
  }
  if (result) {
    res.send({
      postId: result._id,
      user: result.user,
      title: result.title,
      content: result.content,
      createdAt: result.createdAt,
    });
  } else {
    res.status(400).json({ message: "게시글 조회에 실패하였습니다." });
  }
});

// 게시글 수정 API
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user, content, password, title } = req.body;
  if (!ObjectId.isValid(id) || !user || !password || !title || !content) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  } else {
    const post = await Post.findOne({ _id: id });

    if (!post) {
      res.status(400).json({ message: "게시글 조회에 실패하였습니다." });
    } else {
      if (post.password === password) {
        await Post.updateOne({ _id: id }, { user, content, title });
        res.status(200).json({ message: "게시글을 수정하였습니다." });
      } else {
        res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      }
    }
  }
});

// 게시글 삭제 API
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!ObjectId.isValid(id) || !password) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  } else {
    const post = await Post.findOne({ _id: id });
    // console.log("왔니 ?" + post);

    if (!post) {
      res.status(400).json({ message: "게시글 조회에 실패하였습니다." });
    } else {
      if (post.password === password) {
        await Post.deleteOne({ _id: id });
        res.status(200).json({ message: "게시글을 삭제하였습니다." });
      } else {
        res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      }
    }
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const validatePost = require("../validation/post");

const Post = require("../models/Post");
const Profile = require("../models/Profile");

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ msg: "There are no posts" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ msg: "No post found with that id" }));
});

// @route   POST api/posts
// @desc    Creates a post
// @access  Private
router.post("/", auth, (req, res) => {
  const { errors, isValid } = validatePost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Deletes a post
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ noAuthorized: "User not authorized" });
      }
      post
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ notFound: "Post not found" }));
    });
  });
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post("/like/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById({ _id: req.params.id })
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: "User already liked this post" });
        }
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ notFound: "Post not found" }));
  });
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post("/unlike/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById({ _id: req.params.id })
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notLikedYet: "You have not yet liked this post" });
        }
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ notFound: "Post not found" }));
  });
});

// @route   POST api/posts/comment/:id
// @desc    Comment to post using post id
// @access  Private
router.post("/comment/:id", auth, (req, res) => {
  const { errors, isValid } = validatePost(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById({ _id: req.params.id })
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ notFound: "Post not found" }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Deletes comment from post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, (req, res) => {
  Post.findById({ _id: req.params.id })
    .then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ notFound: "Comment does not exist" });
      }
      const removeIndex = post.comments
        .map(item => item.id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ notFound: "Post not found" }));
});

module.exports = router;

//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const postsCtrl = require("../controllers/posts");

//importation des middlewares de vérification
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

try {
    //POSTS

    router.get("/", auth, postsCtrl.getAllPosts); //localhost:5000/api/post
    router.post("/", auth, postsCtrl.createPost); //localhost:5000/api/post
    router.put("/:id", auth, postsCtrl.updatePost); //localhost:5000/api/post/93         93=id de la table posts
    router.delete("/:id", auth, postsCtrl.deletePost); //localhost:5000/api/post/95      95= id de la table posts

    //LIKES

    router.get("/likes", auth, postsCtrl.getLikes);
    router.post("/:id/like", auth, postsCtrl.postLike);

    //COMMENTS

    router.get("/:id/comments", auth, postsCtrl.getAllComments); //localhost:5000/api/post/comments
    router.post("/:id/comment", auth, postsCtrl.createComment); //localhost:5000/api/post/93/comments                    93=id de la table posts
    router.put("/updateComment/:id", auth, postsCtrl.updateComment); //localhost:5000/api/post/updateComment/79          79=id de la table comments
    router.delete("/deleteComment/:id", auth, postsCtrl.deleteComment); //localhost:5000/api/post/deleteComment/92       92=id de la table comments
} catch (error) {
    console.log(error);
}

module.exports = router;

const User = require("./../models/userModel");
const Feed = require("./../models/feedModel");

async function createPost(request, response, next) {
  const { userId, postTitle, postContent, postTags } = request.body;
  const postTagsArray = await postTags.split(",");
  const feed = new Feed({
    postedBy: userId,
    postTitle: postTitle,
    tags: postTagsArray,
    postContent: postContent,
  });

  feed.save().then(() => {
    response.status(200).json({
      message: "Your Post Submitted Successfully",
    });
  });
}

async function getPost(request, response, next) {
  const { id } = request.params;
  Feed.findById({ _id: id })
    .populate("postedBy")
    .populate("comments.postedBy")
    .then((res) => {
      response.status(200).json({
        post: res,
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}

async function getReadingPost(request, response, next) {
  const { id } = request.params;
  Feed.findById({ _id: id })
    .select([
      "postedBy",
      "postTitle",
      "likeCount",
      "commentCount",
      "createdAt",
      "profilePhoto",
    ])
    .populate("postedBy", ["fullName", "email", "profilePhoto"])
    .exec((error, posts) => {
      if (error) {
        response.status(401).json({
          error: error,
        });
      } else {
        response.status(200).json({
          posts: posts,
        });
      }
    });
}

async function getPosts(request, response, next) {
  Feed.find({}, { new: true })
    .select(["postedBy", "postTitle", "createdAt", "comments", "likedBy", "tags"])
    .populate("postedBy", ["fullName", "email", "profilePhoto"])
    .exec((error, posts) => {
      if (error) {
        response.status(401).send(error);
      } else {
        response.status(200).json({
          posts: posts,
        });
      }
    });
}

async function getFilteredPosts(request, response, next) {
  const { topic } = request.params;
  Feed.find({tags: topic}, { new: true })
    .select(["postedBy", "postTitle", "createdAt", "comments", "likedBy", "tags"])
    .populate("postedBy", ["fullName", "email", "profilePhoto"])
    .exec((error, posts) => {
      if (error) {
        response.status(401).send(error);
      } else {
        // console.log("filtered posts",posts);
        response.status(200).json({
          filteredposts: posts,
        });
      }
    });
}

async function editPost(request, response, next) {
  const { title, content } = request.body;
  const updatedInfo = {
    postTitle: title,
    postContent: content,
  };

  Feed.findByIdAndUpdate(request.params.id, updatedInfo)
    .then((res) => {
      response.status(200).json({
        message: "Your Post Updated Successfully!",
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}

async function createPostComment(request, response, next) {
  const { comment, userId } = request.body;
  const { id } = request.params;

  const feed = Feed.findById(id);
  if (feed) {
    const newComment = {
      text: comment,
      postedBy: userId,
      createdAt: new Date(),
    };

    const updatedFeed = {
      $push: { comments: newComment },
    };

    Feed.findByIdAndUpdate(id, updatedFeed).then((res) => {
      response.status(200).json({
        message: "Your Comment Added Successfully!",
        comments: res.comments,
      });
    });
  }
}

async function getUserPosts(request, response, next) {
  const { id } = request.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const result = await User.findById({ _id: id }).populate("Feed");

    if (result) {
      response.status(200).json({
        posts: result,
      });
    } else {
      response.status(404).send("Somthing is wrong.");
    }
  } else {
    response.status(404).send("User Id is Not Valid");
  }
}

async function deletePost(request, response, next) {
  const { id } = request.params;
  Feed.findByIdAndRemove(id)
    .then((res) => {
      response.status(200).json({
        message: "Your Post Deleted Successfully!",
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}

async function addToLikedBy(request, response, next) {
  const { id } = request.params;
  const { userId } = request.body;
  const newItem = {
    userId: userId,
  };

  const updatedLikedBy = {
    $push: { likedBy: newItem },
  };

  Feed.findByIdAndUpdate({ _id: id }, updatedLikedBy, { new: true })
    .then((res) => {
      response.status(200).json({
        message: "Successfully liked this item!",
        updatedLikedBy: res.likedBy,
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}

async function removeFromLikedBy(request, response, next) {
  const { id } = request.params;
  const { userId } = request.body;

  Feed.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        likedBy: { userId: userId },
      },
    },
    { new: true }
  )
    .then((res) => {
      response.status(200).json({
        message: "Successfully Un liked this item!",
        updatedLikedBy: res.likedBy,
      });
    })
    .catch((error) => {
      response.status(401).json({
        error: error,
      });
    });
}

module.exports = {
  createPost,
  getPost,
  getPosts,
  getFilteredPosts,
  editPost,
  createPostComment,
  getUserPosts,
  deletePost,
  getReadingPost,
  addToLikedBy,
  removeFromLikedBy,
};

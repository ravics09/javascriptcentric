import axios from "axios";
import AuthHeader from "./authHeader";

const createPost = async (payload) => {
  const url = "http://localhost:9090/feed/createpost";
  return axios
    .post(url, payload)
    .then((response) => {
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const getAllPosts = async () => {
  const url = "http://localhost:9090/feed/getposts";
  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return {
          status: "success",
          posts: response.data.posts,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const getFilteredPosts = async (searchText) => {
  const url = `http://localhost:9090/feed/getfilteredposts/${searchText}`;
  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return {
          status: "success",
          posts: response.data.filteredposts,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const getPost = async (id) => {
  const url = `http://localhost:9090/feed/getpost/${id}`;
  const payload = {
    id,
  };
  return axios
    .get(url, payload)
    .then((response) => {
      if (response.status === 200) {
        return { status: "success", post: response.data.post };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const getReadingPost = async (id) => {
  const url = `http://localhost:9090/feed/getreadingpost/${id}`;
  const payload = {
    id,
  };
  return axios
    .get(url, payload)
    .then((response) => {
      if (response.status === 200) {
        return {
          post: response.data.posts,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const addComment = (postId, userId, comment) => {
  const url = `http://localhost:9090/feed/createnewcomment/${postId}`;
  const payload = {
    comment,
    userId,
  };

  return axios.put(url, payload).then(
    (response) => {
      return {
        status: "success",
        message: "Your Comment Added Successfully.",
        comments: response.data.comments,
      };
    },
    (error) => {
      if (error.response) {
        return { status: "failed", message: error.response.data };
      } else {
        return { status: "failed", message: "Server Not Responding" };
      }
    }
  );
};

const getUserPosts = (userId) => {
  const url = `http://localhost:9090/feed/getuserposts/${userId}`;
  return axios.get(url).then(
    (response) => {
      if (response.status === 200) {
        return { status: "success", posts: response.data.posts.Feed };
      }
    },
    (error) => {
      if (error.response) {
        return { status: "failed", message: error.response.data };
      } else {
        return { status: "failed", message: "Server Not Responding" };
      }
    }
  );
};

const editPost = async (id, payload) => {
  const url = `http://localhost:9090/feed/editpost/${id}`;
  return axios
    .put(url, payload)
    .then((response) => {
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const deletePost = async (id) => {
  const url = `http://localhost:9090/feed/deletepost/${id}`;
  return axios
    .delete(url, { headers: AuthHeader() })
    .then((response) => {
      if (response.status === 200) {
        return {
          status: "success",
          message: response.data.message,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error.response.data.message,
      };
    });
};

const addToLikedBy = async (id, userId) => {
  const url = `http://localhost:9090/feed/addtolikedby/${id}`;
  const payload = {
    userId,
  };

  return axios.put(url, payload).then(
    (response) => {
      if (response.status === 200) {
        localStorage.setItem(
          "likedByList",
          JSON.stringify(response.data.updatedLikedBy)
        );

        return {
          status: "success",
          message: "Successfully Added to liked List.",
          updatedLikedBy: response.data.updatedLikedBy,
        };
      }
    },
    (error) => {
      if (error.response) {
        return { status: "failed", message: error.response.data };
      } else {
        return { status: "failed", message: "Server Not Responding" };
      }
    }
  );
};

const removeFromLikedBy = async (id, userId) => {
  const url = `http://localhost:9090/feed/removefromlikedby/${id}`;
  const payload = {
    userId,
  };
  return axios.put(url, payload).then(
    (response) => {
      if (response.status === 200) {
        localStorage.setItem(
          "likedByList",
          JSON.stringify(response.data.updatedLikedBy)
        );

        return {
          status: "success",
          message: "Successfully Removed From liked List.",
          updatedLikedBy: response.data.updatedLikedBy,
        };
      }
    },
    (error) => {
      if (error.response) {
        return { status: "failed", message: error.response.data };
      } else {
        return { status: "failed", message: "Server Not Responding" };
      }
    }
  );
};

const feedService = {
  createPost,
  getAllPosts,
  getFilteredPosts,
  getPost,
  addComment,
  getUserPosts,
  editPost,
  deletePost,
  getReadingPost,
  addToLikedBy,
  removeFromLikedBy,
};

export default feedService;

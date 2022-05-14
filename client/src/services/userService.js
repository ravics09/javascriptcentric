import axios from "axios";
import AuthHeader from "./authHeader";
import FeedService from "./feedService";

// const API_URL = "http://localhost:9090/user";
// const OTHER_API_URL = "http://localhost:9090/other";

const editUserProfile = async (id, formValues) => {
  const { fullName, email, mobile, location, bio, work, education, skills } =
    formValues;

  const url = `http://localhost:9090/user/editprofile/${id}`;
  const payload = {
    fullName,
    email,
    mobile,
    location,
    bio,
    work,
    education,
    skills,
  };

  // return axios.put(url, payload, { headers: AuthHeader() }).then(
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

const getUserProfile = async (id) => {
  const url = `http://localhost:9090/user/profile/${id}`;

  // return axios.get(url, { headers: AuthHeader() }).then(
  return axios
    .get(url, { headers: AuthHeader() })
    .then((response) => {
      if (response.status === 200) {
        return {
          status: "success",
          user: response.data.user,
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

const contactUsMessage = (formValues) => {
  const { fullName, email, subject, message } = formValues;
  const url = `http://localhost:9090/other/sendmessage`;
  const payload = {
    fullName,
    email,
    subject,
    message,
  };

  return axios.post(url, payload, { headers: AuthHeader() }).then(
    (response) => {
      if (response.status === 200) {
        return { status: "success", message: "Your message sent successfully" };
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

const uploadProfilePhoto = async (id, formData, options) => {
  const url = `http://localhost:9090/other/uploadprofileimage/${id}`;
  const payload = formData;

  // return axios.put(url, payload, { headers: AuthHeader() }, options).then(
  return axios
    .put(url, payload, options)
    .then((response) => {
      if (response.status === 200) {
        return {
          image: response.data.results.profilePhoto,
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

const addToReadingList = (id, postId) => {
  const url = `http://localhost:9090/other/addtoreadinglist/${id}`;
  const payload = {
    postId,
  };

  return axios.put(url, payload, { headers: AuthHeader() }).then(
    (response) => {
      if (response.status === 200) {
        return {
          status: "success",
          message: "New Article Added To Reading List!",
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

const fetchReadingList = async (id) => {
  const url = `http://localhost:9090/other/fetchReadingList/${id}`;
  const readingListId = await axios.get(url, { headers: AuthHeader() });
  const idList = readingListId.data.readingList;

  let readingList = [];
  if (idList.length > 0) {
    for (let i = 0; i < idList.length; i++) {
      let result = await FeedService.getPost(idList[i].postId);
      if (result.post !== null) readingList.push(result.post);
    }
    return {
      status: "success",
      readingList: readingList,
    };
  } else {
    return {
      status: "failed",
      message: "There are no item in the reading list",
    };
  }
};

const removeFromReadingList = async (id, postId) => {
  const url = `http://localhost:9090/other/removefromreadinglist/${id}`;
  const payload = {
    postId,
  };

  return axios.put(url, payload, { headers: AuthHeader() }).then(
    (response) => {
      if (response.status === 200) {
        return {
          status: "success",
          message: "Selected Article Removed From Reading List!",
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

const userService = {
  getUserProfile,
  editUserProfile,
  contactUsMessage,
  uploadProfilePhoto,
  addToReadingList,
  fetchReadingList,
  removeFromReadingList,
};

export default userService;

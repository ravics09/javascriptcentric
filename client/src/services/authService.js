import axios from "axios";

// const API_URL = "http://localhost:9090/auth";

const signIn = async (payload) => {
  return axios
    .post("/auth/signin", payload)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem("AccessToken", JSON.stringify(response.data.accessToken));
        return {
          status: "success",
          message: "You are redirecting to home page",
          user: response.data.user,
        };
      }
    })
    .catch((error) => {
      return {
        status: "failed",
        message: error ? "Server is not responding" : error.response.data.message,
      };
    });
};

const googleSignIn = async (payload) => {
  return axios
    .post("/auth/googlesignin", payload)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data.user));
        return {
          status: "success",
          message: "You are redirecting to home page",
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

const signUp = async (payload) => {
  return axios
    .post("/auth/signup", payload)
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

const signOut = async () => {
  localStorage.clear();
  return {
    status: "success",
  };
};

const forgotPassword = async (payload) => {
  return axios
    .post("/auth/forgetpassword", payload)
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

const authService = {
  signUp,
  signIn,
  googleSignIn,
  signOut,
  forgotPassword,
};

export default authService;

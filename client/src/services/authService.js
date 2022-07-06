import axios from "axios";

let api = axios.create({
  baseUrl: "http://http://localhost:9090",
  timeout: 1000,
  headers: { "X-Custom-Header": "footer" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    throw err;
  }
);

// const API_URL = "http://localhost:9090/auth";

const signIn = async (payload) => {
  return axios
    .post("http://localhost:9090/auth/signin", payload)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data.user));
        localStorage.setItem(
          "readingList",
          JSON.stringify(response.data.user.readingList)
        );
        localStorage.setItem(
          "AccessToken",
          JSON.stringify(response.data.accessToken)
        );
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
        message: error.response.data.message
      };
    });
};

const googleSignIn = async (payload) => {
  return axios
    .post(`http://localhost:9090/auth/googlesignin`, payload)
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
    .post("http://localhost:9090/auth/signup", payload)
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
    .post("http://localhost:9090/auth/forgetpassword", payload)
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

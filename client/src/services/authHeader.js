const authHeader = () => {
  const accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  const user = JSON.parse(localStorage.getItem("User"));

  if (user && accessToken) {
    const header = { Authorization: "Bearer " + accessToken };
    return header;
  } else {
    return {};
  }
};

export default authHeader;

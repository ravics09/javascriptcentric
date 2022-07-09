import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiOutlineMedium } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Spinner,
} from "react-bootstrap";

import {
  addtoreadinglist,
  removefromreadinglist,
} from "../../actions/userAction";
import homeStyle from "./home.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import FeedService from "../../services/feedService";
import PLACEHOLDER_IMG from "../../assets/images/h1.png";
const topicList = [
  "jsx",
  "java",
  "jquery",
  "javascript",
  "nodejs",
  "expressjs",
  "mongodb",
  "redux",
  "reactjs",
  "reactnative",
  "reduxthunk",
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const { loggedInUser } = useSelector((state) => state.AuthReducer);
  const { readingList } = useSelector((state) => state.UserReducer);
  const { likedByList } = useSelector((state) => state.FeedReducer);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (loggedInUser) {
      setUserId(loggedInUser._id);
      setProfilePhoto(loggedInUser.profilePhoto);
      fetchPostData();
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchPostData = async () => {
    const result = await FeedService.getAllPosts();
    if (result.status === "success") {
      setUserPosts(result.posts.reverse());
    } else {
      swal({
        title: "Error!",
        text: `${result.message}`,
        icon: "warning",
        timer: 2000,
        button: false,
      });
    }
  };

  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  const openSelectedPost = (item) => {
    let Id = item._id;
    navigate(`/fullarticle/${Id}`, { data: item });
  };

  const onSave = async (postId) => {
    dispatch(addtoreadinglist(userId, postId)).then((result) => {
      if (result.status === "success") {
        console.log("Added successfully to list");
        swal({
          title: "Done!",
          text: `${result.message}`,
          icon: "success",
          timer: 2000,
          button: false,
        });
      } else {
        swal({
          title: "Error!",
          text: `${result.message}`,
          icon: "warning",
          timer: 2000,
          button: false,
        });
      }
    });
  };

  const onUnSave = async (postId) => {
    dispatch(removefromreadinglist(userId, postId)).then((result) => {
      if (result.status === "success") {
        console.log("Removed successfully from list");
        swal({
          title: "Done!",
          text: `${result.message}`,
          icon: "success",
          timer: 2000,
          button: false,
        });
      } else {
        swal({
          title: "Error!",
          text: `${result.message}`,
          icon: "warning",
          timer: 2000,
          button: false,
        });
      }
    });
  };

  const PostCard = ({ item, index }) => {
    const formateDate = moment(item.createdAt).format("MMM Do");
    const hourAgo = moment(item.createdAt).startOf("hour").fromNow();
    const minAgo = moment(item.createdAt).startOf("minute").fromNow();
    let readingStatus = false;
    let profilePic;
    if (readingList.length > 0 && readingList.includes(item._id)) {
      readingStatus = true;
    }

    if (item.postedBy.profilePhoto) {
      profilePic = item.postedBy.profilePhoto;
    } else {
      profilePic = PLACEHOLDER_IMG;
    }
    return (
      <Row
        className={homeStyle.middleColumn}
        style={{
          border: "1px solid yellow",
          borderRadius: 10,
        }}
        key={index}
      >
        <div className={homeStyle.cardHeader}>
          <Image src={profilePic} width={50} height={50} roundedCircle />
          <div className={homeStyle.cardName}>
            <span>
              <strong>{item.postedBy.fullName}</strong>
            </span>
            <span>
              {formateDate} {hourAgo > 1 ? hourAgo : minAgo}
            </span>
          </div>
        </div>
        <div className={homeStyle.cardBody}>
          <div
            className={homeStyle.cardTitle}
            style={{ cursor: "pointer" }}
            onClick={() => openSelectedPost(item)}
          >
            <b>
              <big>{item.postTitle}</big>
            </b>
          </div>
          <div className={homeStyle.cardFooter}>
            <span>
              <FaHeart color="red" /> &nbsp; {item.likes} {item.likedBy.length}{" "}
              &nbsp; <FaRegComment color="#0C6EFD" /> &nbsp;{" "}
              {item.comments ? item.comments.length : null}
            </span>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() =>
                readingStatus ? onUnSave(item._id) : onSave(item._id)
              }
            >
              {readingStatus ? "Unsave" : "Save"}
            </Button>
          </div>
        </div>
      </Row>
    );
  };

  const handleFilteredPosts = async (searchText) => {
    setUserPosts([]);
    const result = await FeedService.getFilteredPosts(searchText);
    if (result.status === "success") {
      setUserPosts(result.posts);
    } else {
      fetchPostData();
    }
  };

  const searchTopic = (text) => {
    if (text !== "") {
      let filtered = topicList.filter((item) =>
        item.includes(text.toLowerCase())
      );
      setSearchData(filtered);
    } else {
      setSearchData([]);
      fetchPostData();
    }
  };

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const onSearch = debounce((e) => searchTopic(e));

  const clearSearchData = () => {
    setSearchData([]);
  };

  return (
    <Fragment>
      <Navbar
        showSearchBar={true}
        onSearch={onSearch}
        searchData={searchData}
        clearSearchData={clearSearchData}
        handleFilteredPosts={handleFilteredPosts}
      />
      <Container
        className={homeStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col
            xl={2}
            lg={3}
            style={{ display: dimensions.width < 520 ? "none" : null }}
          >
            <Container fluid="xl">
              <Row className={homeStyle.leftColumn}>
                <Card
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={profilePhoto ? profilePhoto : PLACEHOLDER_IMG}
                  />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      {loggedInUser.fullName}
                    </Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <p>
                        <strong>
                          {loggedInUser.education
                            ? loggedInUser.education
                            : null}
                        </strong>
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <Row
                className={homeStyle.leftColumn}
                style={{ backgroundColor: "#f7dc6f" }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <h4>Follow Us</h4>
                  <p>
                    <BsLinkedin color="#0C63BC" />{" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://www.linkedin.com/in/ravics09/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </p>
                  <p>
                    {" "}
                    <AiOutlineMedium color="black" />{" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://medium.com/@javascriptcentric"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Medium
                    </a>
                  </p>
                  <p>
                    <BsFacebook color="#0C63BC" />{" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://www.facebook.com/javascriptcentric"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>
                  </p>
                  <p>
                    <BsTwitter color="#0C63BC" />{" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://www.w3schools.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Twitter
                    </a>
                  </p>
                  <p></p>
                </div>
              </Row>
            </Container>
          </Col>
          <Col xl={7} lg={6} md={12} xs={12}>
            <Container fluid="xl">
              {userPosts.length > 0 ? (
                userPosts.map((item, index) => (
                  <PostCard item={item} index={index} />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "25%"
                  }}
                >
                  <Spinner color="white" animation="grow" />
                </div>
              )}
            </Container>
          </Col>
          <Col xl={3} lg={3}>
            <Container fluid="xl">
              <Row
                className={homeStyle.rightColumn}
                style={{ backgroundColor: "#f7dc6f" }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <article>
                    <h4>Tredning On JavaScript Centric</h4>
                    <p>Why you should learn NodeJS ?</p>
                    <p>Why you should learn ReactJs ?</p>
                    <p>You will not use redux from next time.</p>
                    <p>What is redux-toolkit ?</p>
                  </article>
                </div>
              </Row>
              <Row
                className={homeStyle.rightColumn}
                style={{ backgroundColor: "#f7dc6f" }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <article>
                    <h4>Most Liked Posts</h4>
                    <p>Why you should learn NodeJS ?</p>
                    <p>Why you should learn ReactJs ?</p>
                    <p>You will not use redux from next time.</p>
                    <p>What is redux-toolkit ?</p>
                  </article>
                </div>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default Home;

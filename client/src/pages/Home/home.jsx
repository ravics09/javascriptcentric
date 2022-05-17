import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import homeStyle from "./home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import {
  addtoreadinglist,
  removefromreadinglist,
} from "../../actions/userAction";
import Navbar from "../../components/navbar";

// import RN_IMG from "../../assets/images/rn.jpg";
// import NODE_JPG from "../../assets/images/node.jpg";
// import REACTJS_IMG from "../../assets/images/react.png";
import PLACEHOLDER_IMG from "../../assets/images/h1.png";
// import JAVASCRIPT_IMG2 from "../../assets/images/js2.png";

// Import Services
// import UserService from "../../services/userService";
import FeedService from "../../services/feedService";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState();

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const { loggedInUser } = useSelector((state) => state.AuthReducer);
  const { readingList } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (loggedInUser) {
      setUserId(loggedInUser._id);
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
    if (readingList.length > 0 && readingList.includes(item._id)) {
      readingStatus = true;
    }

    if (item.postedBy.profilePhoto) {
      var imgstr = item.postedBy.profilePhoto;
      imgstr = imgstr.replace("public", "");
      var profilePic = "http://localhost:9090" + imgstr;
    } else {
      profilePic = PLACEHOLDER_IMG;
    }
    return (
      <Row
        className={homeStyle.secondColumn}
        style={{
          borderColor: "yellow",
          border: "1px solid gray",
          borderRadius: 10,
        }}
        key={index}
      >
        <div className={homeStyle.cardHeader}>
          <Image src={profilePic} width={50} height={50} roundedCircle />
          <div className={homeStyle.cardName}>
            <strong>{item.postedBy.fullName}</strong>
            <p>
              {formateDate} {hourAgo > 1 ? hourAgo : minAgo}
            </p>
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
              <FaHeart color="red" /> &nbsp; {item.likes} Likes &nbsp;{" "}
              <FaRegComment color="#0C6EFD" /> &nbsp;{" "}
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

  return (
    <Fragment>
      <Navbar />
      <Container
        className={homeStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row className="pb-3">
          <Col xl={2} lg={3}>
            <Container fluid="xl">
              <Row className={homeStyle.firstColumnFirstRow}>
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 10,
                  }}
                >
                  <article>
                    <h4>Everything on one place</h4>
                    <p>
                      A Platform where you can find everything related with
                      javascript like Interview questions, Javascript programs,
                      Javascript data structure, codeing challenge and latest
                      article on Javascript.
                    </p>
                  </article>
                </div>
              </Row>
              <Row className={homeStyle.firstColumnSecondRow}>
                <div
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <h4>Other Technologies</h4>
                  <p>ExpressJS</p>
                  <p>MongoDB</p>
                  <p>Redux</p>
                  <p>Redux Saga</p>
                  <p>AWS</p>
                  <p></p>
                </div>
              </Row>
            </Container>
          </Col>
          <Col xl={7} lg={6} md={12} xs={12}>
            <Container fluid="xl">
              {userPosts
                ? userPosts.map((item, index) => (
                    <PostCard item={item} index={index} />
                  ))
                : null}
            </Container>
          </Col>
          <Col xl={3} lg={3}>
            <Container fluid="xl">
              <Row className={homeStyle.firstColumnFirstRow}>
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
              <Row className={homeStyle.firstColumnFirstRow}>
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
          {/* <Col md={3}>
            <Row
              className={homeStyle.rightCardSection}
              // style={{ backgroundColor: "#abcff7" }}
            >
              <Image
                src={JAVASCRIPT_IMG2}
                style={{
                  cursor: "pointer",
                  borderRadius: "30px",
                  width: "100%",
                  height: "200px",
                }}
                onClick={openJavaScriptSection}
              />
            </Row>
            <Row
              className={homeStyle.rightCardSection}
              // style={{ backgroundColor: "#f9e79f" }}
            >
              <Image
                src={REACTJS_IMG}
                style={{
                  cursor: "pointer",
                  borderRadius: "30px",
                  width: "100%",
                  height: "200px",
                }}
                onClick={openReactJSSection}
              />
            </Row>
            <Row
              className={homeStyle.rightCardSection}
              // style={{ backgroundColor: "#f1948a" }}
            >
              <Image
                src={RN_IMG}
                style={{
                  cursor: "pointer",
                  borderRadius: "30px",
                  width: "100%",
                  height: "200px",
                }}
                onClick={openReactNativeSection}
              />
            </Row>
            <Row
              className={homeStyle.rightCardSection}
              // style={{ backgroundColor: "#f7dc6f" }}
            >
              <Image
                src={NODE_JPG}
                style={{
                  cursor: "pointer",
                  borderRadius: "30px",
                  width: "100%",
                  height: "100%",
                }}
                onClick={openNodeJSSection}
              />
            </Row>
            <Row
              className={homeStyle.rightCardSection}
              // style={{ backgroundColor: "#f7dc6f" }}
            >
              <Image
                src={NODE_JPG}
                style={{
                  cursor: "pointer",
                  borderRadius: "30px",
                  width: "100%",
                  height: "100%",
                }}
                onClick={openNodeJSSection}
              />
            </Row>
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};
export default Home;

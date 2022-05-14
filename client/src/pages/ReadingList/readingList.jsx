import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import moment from "moment";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { FaHeart, FaRegComment } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar";
import UserService from "../../services/userService";
import readingListStyle from "./readingList.module.css";
import PLACEHOLDER_IMG from "../../assets/images/h1.png";

const ReadingList = () => {
  const navigate = useNavigate();
  const [readingList, setReadingList] = useState([]);
  const [userId, setUserId] = useState("");
  const { loggedInUser } = useSelector((state) => state.AuthReducer);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (loggedInUser) {
      setUserId(loggedInUser._id);
      fecthReadingListID(loggedInUser._id);
    }

    async function fecthReadingListID(id) {
      const result = await UserService.fetchReadingList(id);
      if (result.status === "success") {
        setReadingList(result.readingList);
      } else {
        swal({
          title: "Error!",
          text: `${result.message}`,
          icon: "warning",
          timer: 2000,
          button: false,
        });
      }
    }
  }, []);

  const openSelectedPost = (Id) => {
    navigate(`/fullarticle/${Id}`);
  };

  const removeItemFromReadingList = async (postId) => {
    const result = await UserService.removeFromReadingList(userId, postId);
    if (result.status === "success") {
      swal({
        title: "Done!",
        text: `${result.message}`,
        icon: "success",
        timer: 2000,
        button: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
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

  const RenderAllPost = ({ item, index }) => {
    const formateDate = moment(item.createdAt).format("MMM Do");
    if (item.postedBy.profilePhoto) {
      var imgstr = item.postedBy.profilePhoto;
      imgstr = imgstr.replace("public", "");
      var profilePic = "http://localhost:9090" + imgstr;
    } else {
      profilePic = PLACEHOLDER_IMG;
    }
    return (
      <div className={readingListStyle.renderPost} key={index}>
        <div className={readingListStyle.postByData}>
          <div>
            <Image src={profilePic} width={50} height={50} roundedCircle />
          </div>
          <div className={readingListStyle.titleSection}>
            <h5
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => openSelectedPost(item._id)}
            >
              {item.postTitle}
            </h5>
            <p>
              <span style={{ color: "lightgray" }}>
                {item.postedBy.fullName}
              </span>{" "}
              Published On {formateDate}
            </p>
          </div>
        </div>
        <div className={readingListStyle.postInfo}>
          <FaHeart color="red" /> &nbsp; &nbsp;
          <FaRegComment color="#0C6EFD" />{" "}
          {item.comments ? item.comments.length : 0}
        </div>
        <div>
          <Button
            className={readingListStyle.customBtn}
            variant="dark"
            onClick={() => removeItemFromReadingList(item._id)}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Navbar />
      <Container
        className={readingListStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row className={readingListStyle.topRow}>
          <div className={readingListStyle.topRowItems}>
            <h2>Reading list ({readingList ? readingList.length : 0})</h2>
          </div>
        </Row>
        <Row className={readingListStyle.postRow}>
          <Col md={3} className={readingListStyle.otherInfoSection}>
            <p>
              API is the acronym for Application Programming Interface, which is
              a software intermediary that allows two applications to talk to
              each other!
            </p>
          </Col>
          <Col md={9} className={readingListStyle.readingListSection}>
            {readingList
              ? readingList.map((item, index) => (
                  <RenderAllPost item={item} index={index} />
                ))
              : null}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ReadingList;

import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import moment from "moment";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar";
import dashboardStyle from "./dashboard.module.css";
import FeedService from "../../services/feedService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const { loggedInUser } = useSelector((state) => state.AuthReducer);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const fecthUserPosts = async (id) => {
    const result = await FeedService.getUserPosts(id);
    if (result.status === "success") {
      setUserPosts(result.posts);
    } else {
      setUserPosts([]);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      fecthUserPosts(loggedInUser._id);
    }
  }, []);

  const openSelectedPost = (item) => {
    let Id = item._id;
    navigate(`/fullarticle/${Id}`, { data: item });
  };

  const editSelectedPost = (item) => {
    let Id = item._id;
    navigate(`/${Id}/editpost`, { data: item });
  };

  const deleteSelectedPost = async (id) => {
    const result = await FeedService.deletePost(id);
    if (result.status === "success") {
      swal({
        title: "Done!",
        text: `${result.message}`,
        icon: "success",
        timer: 2000,
        button: false,
      });

      setTimeout(function () {
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
    return (
      <div className={dashboardStyle.renderPost} key={index}>
        <div className={dashboardStyle.titleSection}>
          <h5
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => openSelectedPost(item)}
          >
            {item.postTitle}
          </h5>
          <p>Published: {formateDate}</p>
        </div>
        <div className={dashboardStyle.postInfo}>
          <FaHeart color="red" /> &nbsp; &nbsp;
          <FaRegComment color="#0C6EFD" /> {item.comments.length}
        </div>
        <div>
          <Button
            className={dashboardStyle.customBtn}
            variant="primary"
            size="sm"
            onClick={() => editSelectedPost(item)}
          >
            Edit
          </Button>
          {"  "}
          <Button
            className={dashboardStyle.customBtn}
            variant="outline-danger"
            size="sm"
            onClick={() => deleteSelectedPost(item._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Navbar />
      <Container
        className={dashboardStyle.container}
        style={{ minHeight: dimensions.height - 100 }}
      >
        <Row className={dashboardStyle.topRow}>
          <h2>Dashboard</h2>
        </Row>
        <Row className={dashboardStyle.cardRow}>
          <Col md={3}>
            <div className={dashboardStyle.headerCard}>
              <big>{userPosts.length}</big>
              <p>Total Posts</p>
            </div>
          </Col>
          <Col md={3}>
            <div className={dashboardStyle.headerCard}>
              <big>10000</big>
              <p>Total Post Views</p>
            </div>
          </Col>
          <Col md={3}>
            <div className={dashboardStyle.headerCard}>
              <big>20</big>
              <p>Total Likes</p>
            </div>
          </Col>
          <Col md={3}>
            <div className={dashboardStyle.headerCard}>
              <b>14</b>
              <p>Total Comments</p>
            </div>
          </Col>
        </Row>
        <Row className={dashboardStyle.postRow}>
          <Col md={3} className={dashboardStyle.otherInfoSection}>
            <Row>
              <h5>Other Info</h5>
            </Row>
            <Row style={{ paddingTop: "20px", paddingBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <b>Followers</b>
                <b>20</b>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <b>Following users</b>
                <b>20</b>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <b>Following Organizations</b>
                <b>20</b>
              </div>
            </Row>
            <Row style={{ marginLeft: "1px", marginRight: "1px" }}>
              <Button variant="outline-info" as={NavLink} to="/account">
                Account
              </Button>
            </Row>
          </Col>
          <Col md={9} className={dashboardStyle.postsSection}>
            <Row>
              <div className={dashboardStyle.mainPostHeader}>
                <h5>Posts</h5>
                <Form.Control
                  as="select"
                  style={{
                    width: 130,
                    backgroundColor: "#0C6EFD",
                    borderRadius: 10,
                    color: "#FFFFF",
                  }}
                  custom
                >
                  <option value="1">Most Views</option>
                  <option value="2">Most Likes</option>
                  <option value="3">Most Comments</option>
                </Form.Control>
              </div>
            </Row>
            <Row className={dashboardStyle.mainPostRow}>
              {userPosts
                ? userPosts.map((item, index) => (
                    <RenderAllPost item={item} index={index} />
                  ))
                : null}
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Dashboard;

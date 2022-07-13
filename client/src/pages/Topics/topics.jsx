import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import TopicsStyle from "./topics.module.css";
import DEVELOPER_IMG from "../../assets/images/developer.png";
import NODE_IMG from "../../assets/images/node.jpg";
const jsData = [
  {
    id: 1,
    topic: "Closure",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 2,
    topic: "Currying",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 3,
    topic: "First Class Function",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 4,
    topic: "Factory Function",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 5,
    topic: "Closure",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 6,
    topic: "Currying",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 7,
    topic: "First Class Function",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 8,
    topic: "Factory Function",
    description: "its is combination of lexical scope and function",
  },
];

const Topics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(jsData);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (data.length === 0) {
      setData(jsData);
    }
  });

  const handleTopicSelect = (e, path) => {
    e.preventDefault();
    navigate(`${path}`);
  };

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container>
        <Row>
          <div className={TopicsStyle.header}>
            <Image src={DEVELOPER_IMG} width={200} height={200} />
            <h2 style={{ paddingTop: "10px" }}>Ravi Sharma</h2>
            <h5 style={{ color: "gray", paddingTop: "10px" }}>
            High quality development articles for all developers
            </h5>
            <p style={{ color: "gray", paddingTop: "10px" }}>
              India, Total Post 55
            </p>
          </div>
        </Row>
        <Row>
          <Col style={{ marginBottom: "100px" }}>
            <div className={TopicsStyle.titleContainer}>
              <h2>Popular Topics</h2>
            </div>
            <div className={TopicsStyle.popularTopicsContainer}>
              <div className={TopicsStyle.popularTopics}>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "javascript");
                  }}
                  className={TopicsStyle.customButton}
                >
                  Java Script
                </Button>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "reactjs");
                  }}
                  className={TopicsStyle.customButton}
                >
                  ReactJS
                </Button>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "redux");
                  }}
                  className={TopicsStyle.customButton}
                >
                  Redux
                </Button>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "react_native");
                  }}
                  className={TopicsStyle.customButton}
                >
                  React Native
                </Button>
              </div>
              <div className={TopicsStyle.popularTopics}>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "nodejs");
                  }}
                  className={TopicsStyle.customButton}
                >
                  NodeJS
                </Button>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "expressjs");
                  }}
                  className={TopicsStyle.customButton}
                >
                  ExpressJS
                </Button>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "mongodb");
                  }}
                  className={TopicsStyle.customButton}
                >
                  MongoDB
                </Button>
                <Button
                variant="outline-secondary"
                  onClick={(e) => {
                    handleTopicSelect(e, "async_programming");
                  }}
                  className={TopicsStyle.customButton}
                >
                  Async
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: "100px" }}>
            <div className={TopicsStyle.titleContainer}>
              <h2>Latest Articles</h2>
            </div>
            <div className={TopicsStyle.latestArticlesContainer}>
              <div className={TopicsStyle.latestArticles}>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
              </div>
              <div className={TopicsStyle.latestArticles}>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: "100px" }}>
            <div className={TopicsStyle.titleContainer}>
              <h2>Most Recently Updated</h2>
            </div>
            <div className={TopicsStyle.mostRecentUpdateContainer}>
              <div className={TopicsStyle.mostRecentUpdateArticles}>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
              </div>
              <div className={TopicsStyle.latestArticles}>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
                <div className={TopicsStyle.card}>
                  <Image src={NODE_IMG} width="100%" />
                  <h5>NodeJs Buffer Class Exampls</h5>
                  <p>20th June </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default Topics;

import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import MongoDBStyle from "./mongoDB.module.css";

const MongoDB = () => {
  const history = useNavigate();

  const selectJavaScriptTopic = (topic) => {
    switch (topic) {
      case "interviewquestions":
        history.push("/interviewQuestions");
        break;
      case "programs":
        history.push("/programs");
        break;
      case "onlinequiz":
        history.push("/codingchallenge");
        break;
      case "importantlinks":
        history.push("/importantlinks");
        break;
    }
  };
  return (
    <Container className={MongoDBStyle.container}>
      <Row className={MongoDBStyle.topRow}>
        <h2>MongoDB</h2>
      </Row>
      <Row className={MongoDBStyle.topicRow}>
        <Col>
          <div
            className={MongoDBStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("javascript")}
          >
            <p>Interview Questions</p>
          </div>
        </Col>
        <Col>
          <div
            className={MongoDBStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("nodejs")}
          >
            <p>Programs</p>
          </div>
        </Col>
        <Col>
          <div
            className={MongoDBStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("reactjs")}
          >
            <p>Online Quiz</p>
          </div>
        </Col>
        <Col>
          <div
            className={MongoDBStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("reactnative")}
          >
            <p>Projects</p>
          </div>
        </Col>
        <Col>
          <div
            className={MongoDBStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("reactnative")}
          >
            <p>Important Links</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default MongoDB;

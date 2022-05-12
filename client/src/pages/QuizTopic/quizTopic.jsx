import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import QuizTopicStyle from "./quizTopic.module.css";

const QuizTopic = () => {
  const history = useNavigate();

  const handleSelectedQuizTopic = (topic) => {
    switch (topic) {
      case "javascript":
        history.push(`/${'javascript'}/quiztopicstatusboard`);
        break;
      case "nodejs":
        history.push(`/${'nodejs'}/quiztopicstatusboard`);
        break;
      case "reactjs":
        history.push(`/${'reactjs'}/quiztopicstatusboard`);
        break;
      case "reactnative":
        history.push(`/${'reactnative'}/quiztopicstatusboard`);
        break;
    }
  };
  return (
    <Container className={QuizTopicStyle.container}>
      <Row className={QuizTopicStyle.topRow}>
        <h2>Select Quiz Topic</h2>
      </Row>
      <Row className={QuizTopicStyle.topicRow}>
        <Col>
          <div
            className={QuizTopicStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectedQuizTopic("javascript")}
          >
            <p>JavaScript</p>
          </div>
        </Col>
        <Col>
          <div
            className={QuizTopicStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectedQuizTopic("nodejs")}
          >
            <p>NodeJS</p>
          </div>
        </Col>
        <Col>
          <div
            className={QuizTopicStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectedQuizTopic("reactjs")}
          >
            <p>ReactJS</p>
          </div>
        </Col>
        <Col>
          <div
            className={QuizTopicStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectedQuizTopic("reactnative")}
          >
            <p>React Native</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default QuizTopic;

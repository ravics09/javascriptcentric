import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ReactNativeStyle from "./reactNative.module.css";

const ReactNative = () => {
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
    <Container className={ReactNativeStyle.container}>
      <Row className={ReactNativeStyle.topRow}>
        <h2>React Native</h2>
      </Row>
      <Row className={ReactNativeStyle.topicRow}>
        <Col>
          <div
            className={ReactNativeStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("javascript")}
          >
            <p>Interview Questions</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactNativeStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("nodejs")}
          >
            <p>Programs</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactNativeStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("reactjs")}
          >
            <p>Online Quiz</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactNativeStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("reactnative")}
          >
            <p>Projects</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactNativeStyle.topicCard}
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
export default ReactNative;

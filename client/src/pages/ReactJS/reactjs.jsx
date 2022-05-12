import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ReactJSStyle from "./reactJS.module.css";

const ReactJS = () => {
  const history = useNavigate();

  const selectReactJSTopic = (topic) => {
    switch (topic) {
      case "interviewquestions":
        history.push("/interviewQuestions");
        break;
      case "programs":
        history.push("/programs");
        break;
      case "onlinequiz":
        history.push(`/${"reactjs"}/quizstatusboard`);
        break;
      case "projects":
        history.push("/importantlinks");
        break;
      case "jobs":
        history.push("/importantlinks");
        break;
    }
  };
  return (
    <Container className={ReactJSStyle.container}>
      <Row className={ReactJSStyle.topRow}>
        <h2>ReactJS</h2>
      </Row>
      <Row className={ReactJSStyle.topicRow}>
        <Col>
          <div
            className={ReactJSStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectReactJSTopic("interviewquestions")}
          >
            <p>Interview Questions</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactJSStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectReactJSTopic("programs")}
          >
            <p>Programs</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactJSStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectReactJSTopic("onlinequiz")}
          >
            <p>Online Quiz</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactJSStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectReactJSTopic("projects")}
          >
            <p>Projects</p>
          </div>
        </Col>
        <Col>
          <div
            className={ReactJSStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectReactJSTopic("jobs")}
          >
            <p>Jobs</p>
          </div>
        </Col>
      </Row>
      <Row className={ReactJSStyle.topRow}>
        <h2>Important Links</h2>
      </Row>
      <Row className={ReactJSStyle.topicRow}>
        <div>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
        </div>
      </Row>
      <Row className={ReactJSStyle.topRow}>
        <h2>Helpful Youtube Channels</h2>
      </Row>
      <Row className={ReactJSStyle.topicRow}>
        <div>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
          <p>link 1</p>
        </div>
      </Row>
    </Container>
  );
};
export default ReactJS;

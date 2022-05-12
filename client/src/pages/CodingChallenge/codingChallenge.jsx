import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import codingChallengeStyle from "./codingChallenge.module.css";
const {innerHeight: winHight } = window;

const CodingChallenges = () => {
  const history = useNavigate();
  const [user, setUser] = useState("");

  const openInterviewQuestion = () => {
    history.push("/interviewquestions");
  };

  const openCodingChallenge = () => {
    history.push("/codingchallenge");
  };

  const openAllPrograms = () => {
    history.push("/programs");
  };

  const openDataStructures = () => {
    history.push("/interviewquestions");
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("userData"));
    const now = new Date();
    if (loggedInUser) {
      if (loggedInUser.expiry && Math.abs(loggedInUser.expiry - now) > 30) {
      } else {
        setUser(loggedInUser.user);
      }
    } else {
      return null;
    }
  }, []);

  return (
    <Container className={codingChallengeStyle.container}>
      <Row className="mb-3">
        <Col md={9}>
          <Row className={codingChallengeStyle.firstColumnHeader}>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <b>
                  <big>100+ JavaScript Coding Challenges</big>
                </b>
              </div>
          </Row>
          <Row className={codingChallengeStyle.firstColumnRows}>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  height:winHight - 100,
                  textAlign: 'center'
                }}
              >
                <p>
                  Please Login To Continue For This Section...
                </p>
              </div>
          </Row>
          </Col>
        <Col xs={12} md={3}>
          <Row className={codingChallengeStyle.interviewSection}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
                onClick={openInterviewQuestion}
              >
                <h4>400+ Interview Questions</h4>
                <p>
                  JavaScript Centric Provides more then 400 interview question
                  which helps you to prepare for any javascript interview. We
                  covered almost all important questions from basic to advance
                  level with the exact answers.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={codingChallengeStyle.codingSection}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
                onClick={openCodingChallenge}
              >
                <h4>100+ Coding Challenge</h4>
                <p>
                  JavaScript Centric Provides different varity of coding
                  problems that helps you in coding round of any big MNC like
                  Amazon, Google, Flipkart, Paytm, Wallmart and many more.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={codingChallengeStyle.programSection}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
                onClick={openAllPrograms}
              >
                <h4>100+ Programs</h4>
                <p>
                  JavaScript Centric have more then 100 basic to advance level
                  programs that can help you to solve problems. and helps you
                  for any coding challenge.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={codingChallengeStyle.dataStructureSection}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  cursor: "pointer",
                }}
                onClick={openDataStructures}
              >
                <h4>JS Data Structure</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default CodingChallenges;

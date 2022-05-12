import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import programsStyle from "./programs.module.css";

const JavaScriptPrograms = () => {
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
    <Container className={programsStyle.container}>
      <Row className="mb-3">
        <Col md={9}>
          <Row className={programsStyle.firstColumnHeader}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <b>
                  <big>100+ JavaScript Programs</big>
                </b>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows} style={{ border: "1px solid gray", borderRadius: 10 }}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <article>
                  <h4>1.Verify a prime number?</h4>
                  <p>
                  <strong>Question:</strong> How would you verify a prime number?
                  </p>
                  <p><strong>Answer:</strong> a prime number is only divisible by itself and 1. So, i will run a while loop and increase by 1. (look at the code example. If you dont get it. this is not your cake. do learn javaScript basics and come back.)</p>
                  <pre style={{
                    padding: 10,
                    backgroundColor: "#181A1F",
                    color: "white",
                  }}>
                    {`function isPrime(n){
  var divisor = 2;

  while (n > divisor){
    if(n % divisor == 0){
     return false; 
    }
    else
      divisor++;
  }
  return true;
}

> isPrime(137);
  = true
> isPrime(237);
  = false`}
                  </pre>
                </article>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows} style={{ border: "1px solid gray", borderRadius: 10 }}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows} style={{ border: "1px solid gray", borderRadius: 10 }}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </Col>
          </Row>
          <Row className={programsStyle.firstColumnRows}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
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
        <Col xs={12} md={3}>
          <Row className={programsStyle.interviewSection}>
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
          <Row className={programsStyle.codingSection}>
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
          <Row className={programsStyle.programSection}>
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
          <Row className={programsStyle.dataStructureSection}>
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
export default JavaScriptPrograms;

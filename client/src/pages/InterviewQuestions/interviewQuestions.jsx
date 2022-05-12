import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import interviewQuestionsStyle from "./interviewQuestions.module.css";
import PROTOTYPE_CHAIN_IMG from "../../assets/images/prototypeChain.png";

const InterviewQuestions = () => {
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
    <Container className={interviewQuestionsStyle.container}>
      <Row className="mb-3">
        <Col md={9}>
          <Row className={interviewQuestionsStyle.firstColumnHeader}>
            <div
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <b>
                <big>400+ JavaScript Intreview Questions</big>
              </b>
            </div>
          </Row>
          <Row className={interviewQuestionsStyle.firstColumnRows} style={{ border: "1px solid gray", borderRadius: 10 }}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <article>
                  <h4>1.What is a prototype chain</h4>

                  <blockquote>
                    Prototype chaining is used to build new types of objects
                    based on existing ones. It is similar to inheritance in a
                    class based language.The prototype on object instance is
                    available through Object.getPrototypeOf(object) or proto
                    property whereas prototype on constructors function is
                    available through Object.prototype.
                  </blockquote>
                  <Image src={PROTOTYPE_CHAIN_IMG} style={{ width: "100%" }} />
                </article>
              </div>
            </Col>
          </Row>
          <Row className={interviewQuestionsStyle.firstColumnRows} style={{ border: "1px solid gray", borderRadius: 10 }}>
            <Col>
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <article>
                  <h4>2.What is the difference between Call, Apply and Bind</h4>
                  <p>
                    The difference between Call, Apply and Bind can be explained
                    with below examples.
                  </p>
                  <p>
                    Call: The call() method invokes a function with a given this
                    value and arguments provided one by one.
                  </p>
                  <pre
                    style={{
                      padding: 10,
                      backgroundColor: "#181A1F",
                      color: "white",
                    }}
                  >
                    {`var employee1 = {firstName: 'John', lastName: 'Rodson'};
var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};
                  
function invite(greeting1, greeting2) {
  console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
}
                  
invite.call(employee1, 'Hello', 'How are you?'); // Hello John Rodson, How are you?
invite.call(employee2, 'Hello', 'How are you?'); // Hello Jimmy Baily, How are you?
`}
                  </pre>
                  <p>
                    Apply: Invokes the function with a given this value and
                    allows you to pass in arguments as an array
                  </p>
                  <pre
                    style={{
                      padding: 10,
                      backgroundColor: "#181A1F",
                      color: "white",
                    }}
                  >
                    {`var employee1 = {firstName: 'John', lastName: 'Rodson'};
var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};

function invite(greeting1, greeting2) {
  console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
}

invite.apply(employee1, ['Hello', 'How are you?']); // Hello John Rodson, How are you?
invite.apply(employee2, ['Hello', 'How are you?']); // Hello Jimmy Baily, How are you?`}
                  </pre>
                </article>
              </div>
            </Col>
          </Row>
          <Row className={interviewQuestionsStyle.firstColumnRows} style={{ border: "1px solid gray", borderRadius: 10 }}>
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
          <Row className={interviewQuestionsStyle.firstColumnRows}>
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
          <Row className={interviewQuestionsStyle.firstColumnRows}>
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
          <Row className={interviewQuestionsStyle.firstColumnRows}>
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
          <Row className={interviewQuestionsStyle.firstColumnRows}>
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
          <Row className={interviewQuestionsStyle.firstColumnRows}>
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
        <Col md={3}>
          <Row className={interviewQuestionsStyle.interviewSection}>
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
          <Row className={interviewQuestionsStyle.codingSection}>
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
          <Row className={interviewQuestionsStyle.programSection}>
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
          <Row className={interviewQuestionsStyle.dataStructureSection}>
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
export default InterviewQuestions;

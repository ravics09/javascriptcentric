import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import OnlineQuizStyle from "./onlineQuiz.module.css";
let quizData = [
  {
    id: 1,
    ques: "What will be printed on the browser console?",
    code: `
var a = 10;
function foo() {
console.log(a); // ??
var a = 20;
}

foo();
`,
    options: [
      { id: 1, text: "Web Dev Simplified", correct: false },
      { id: 2, text: "Traversy Media", correct: false },
      { id: 3, text: "Dev Ed", correct: false },
      { id: 4, text: "Fun Fun Function", correct: true },
    ],
    explaination: `
    I have a search box that I can copy and paste a column from excel. I parse the input and generate an array of the entries.
I am then mapping over the entries and calling a custom hook with each item to fetch some data from my graphql endpoint.
    `,
    ans: "D",
  },
  {
    id: 2,
    ques: "What elements will be in the “newArray”?",
    code: `
    var array = [];
    for(var i = 0; i <3; i++) {
     array.push(() => i);
    }
    var newArray = array.map(el => el());
    console.log(newArray); // ??
`,
    options: [
      { id: 1, text: "first one correct", correct: false },
      { id: 2, text: "second one correct", correct: false },
      { id: 3, text: "All are correct", correct: true },
      { id: 4, text: "Not all correct", correct: false },
    ],
    explaination: `
    I have a search box that I can copy and paste a column from excel. I parse the input and generate an array of the entries.
I am then mapping over the entries and calling a custom hook with each item to fetch some data from my graphql endpoint.
    `,
    ans: "C",
  },
  {
    id: 3,
    ques: "What will be printed on the browser console?",
    code: `
var a = 10;
function foo() {
console.log(a); // ??
var a = 20;
}

foo();
`,
    options: [
      { id: 1, text: "Web Dev Simplified", correct: false },
      { id: 2, text: "Traversy Media", correct: false },
      { id: 3, text: "Dev Ed", correct: false },
      { id: 4, text: "Fun Fun Function", correct: true },
    ],
    explaination: `
    I have a search box that I can copy and paste a column from excel. I parse the input and generate an array of the entries.
I am then mapping over the entries and calling a custom hook with each item to fetch some data from my graphql endpoint.
    `,
    ans: "D",
  },
  {
    id: 4,
    ques: "What will be printed on the browser console?",
    code: `
var a = 10;
function foo() {
console.log(a); // ??
var a = 20;
}

foo();
`,
    options: [
      { id: 1, text: "Web Dev Simplified", correct: false },
      { id: 2, text: "Traversy Media", correct: false },
      { id: 3, text: "Dev Ed", correct: false },
      { id: 4, text: "Fun Fun Function", correct: true },
    ],
    explaination: `
    I have a search box that I can copy and paste a column from excel. I parse the input and generate an array of the entries.
I am then mapping over the entries and calling a custom hook with each item to fetch some data from my graphql endpoint.
    `,
    ans: "D",
  },
];

const OnlineQuiz = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [queNo, setQueNo] = useState(1);
  const [quizName, setQuizName] = useState("");
  const [ansData, setAnsData] = useState([]);
  const [tempAns, setTempAns] = useState({});
  const [disabledBtn, setDisabledBtn] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    switch (id) {
      case "js":
        setQuizName("JavaScript");
        break;
      case "rjs":
        setQuizName("React JS");
        break;
    }
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (item, selectedOption) => (e) => {
    e.preventDefault();
    let tempResult = "";

    if (selectedOption.correct === true) {
      tempResult = "Correct";
    } else tempResult = "Wrong";

    let tempObj = {
      qusNo: item.id,
      result: tempResult,
    };

    setTempAns(tempObj);
  };

  const handleSubmit = (item) => {
    setDisabledBtn([...disabledBtn, item.id]);
    ansData.push(tempAns);
    setAnsData(ansData);
  };

  const handleExplaination = (item) => {
    setShowModal(true);
    setTempData(item);
  };

  const handleFinalSubmission = () => {
    let c = 0;
    let w = 0;
    ansData.map((item, index) => {
      if (item.result === "Correct") c++;
      else w++;
    });

    alert(`Total Correct Answers ${c} and Total Wrong Answers ${w}`);
    //update final result in database.
  };

  const handleEndQuiz = () => {
    setTimeout(function () {
      history.push("/jsstatusdashboard");
      window.location.reload();
    }, 1000);
  };

  const handleBookmark = (item) => {
    alert("handleBookmark the ques : " + item.id);
    // save this ques in bookmark list for user
  };

  const RenderQues = ({ item, index }) => {
    return (
      <Row key={index}>
        <div>
          <div className={OnlineQuizStyle.quesTitle}>
            <h4>{`Question ${item.id}:  ${item.ques}`}</h4>
          </div>
          <div className={OnlineQuizStyle.quesBody}>
            <Form.Control
              as="textarea"
              placeholder={item.code}
              style={{
                maxHeight: "300px",
                minHeight: "300px",
                backgroundColor: "#242424",
                borderRadius: "10px",
                borderColor: "#181a1f",
              }}
              disabled={true}
            />
          </div>
          <Form
            style={{ paddingTop: "10px" }}
            key={index}
            className={OnlineQuizStyle.optionSection}
          >
            <div>
              {item.options.map((elem, index) => (
                <Form.Check
                  type="radio"
                  label={elem.text}
                  name="formHorizontalRadios"
                  id={elem.id}
                  onChange={handleChange(item, elem)}
                />
              ))}
            </div>
            <div>
              <Button
                variant="success"
                size="sm"
                disabled={disabledBtn.indexOf(item.id) !== -1}
                onClick={() => handleSubmit(item)}
              >
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="primary"
                size="sm"
                disabled={disabledBtn.indexOf(item.id) == -1}
                onClick={() => handleExplaination(item)}
              >
                Explaination
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="info"
                size="sm"
                onClick={() => handleBookmark(item)}
              >
                Bookmark
              </Button>
            </div>
          </Form>
        </div>
      </Row>
    );
  };

  return (
    <Container className={OnlineQuizStyle.container}>
      {loading === true ? (
        <div className={OnlineQuizStyle.loader}>
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          <Row className={OnlineQuizStyle.topRow}>
            <div className={OnlineQuizStyle.topRowItems}>
              <h3>{quizName} Quiz</h3>
              <div>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleFinalSubmission()}
                  disabled={disabledBtn.length === 4 ? false : true}
                >
                  Done
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEndQuiz()}
                >
                  End Quiz
                </Button>
              </div>
            </div>
          </Row>
          {quizData
            ? quizData
                .map((item, index) => <RenderQues item={item} index={index} />)
                .filter((e, k) => k == queNo - 1)
            : null}
          <Row className={OnlineQuizStyle.bottomRow}>
            <div className={OnlineQuizStyle.bottomRowItems}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setQueNo(queNo - 1)}
                disabled={queNo === 1 ? true : false}
              >
                Back
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="primary"
                size="sm"
                onClick={() => setQueNo(queNo + 1)}
                disabled={queNo === 4 ? true : false}
              >
                Next
              </Button>
            </div>
          </Row>
        </>
      )}
      {tempData ? (
        <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="photoUploadModal">
              Correct Answer: {tempData.ans}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>{tempData.explaination}</p>
          </Modal.Body>
        </Modal>
      ) : null}
    </Container>
  );
};

export default OnlineQuiz;

import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Container,
  Image,
  ProgressBar,
  Button,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import QuizStatusBoardStyle from "./quizStatusBoard.module.css";
import PLACEHOLDER_IMG from "../../assets/images/h1.png";

const QuizStatusBoard = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [topic, setTopic] = useState('');
  const [topicDetails, setTopicDetails] = useState([]);

  useEffect(()=>{
    switch (id) {
      case "javascript":
        setTopic('JavaScript');
        break;
      case "reactjs":
        setTopic('ReactJS');
        break;
      case "reactnative":
        setTopic('React Native');
        break;
      case "nodejs":
        setTopic('NodeJS');
        break;
      case "mongodb":
        setTopic('MongoDB');
        break;
    }

    // On the basis of topic we fetch dashboard details.
    //setTopicDetails(responseData);

  },[])

  const now = 40;
  const ProgressInstance = () => (
    <ProgressBar now={now} label={`${now}% Questions`} />
  );

  const handleStartQuiz = () => {
    let Id = "js"
    history.push(`/onlinequiz/${Id}`);
  }

  return (
    <Container className={QuizStatusBoardStyle.container}>
      <Row className={QuizStatusBoardStyle.topRow}>
        <div className={QuizStatusBoardStyle.topRowItems}>
          <h3>{topic} Quiz Dashboard</h3>
          <Button variant="success" size="sm" onClick={()=>handleStartQuiz()}>
            Start Quiz
          </Button>
        </div>
      </Row>
      <Row className={QuizStatusBoardStyle.profileRow}>
        <div className={QuizStatusBoardStyle.userDetail}>
          <Image src={PLACEHOLDER_IMG} width={150} height={150} />
          <div style={{ paddingLeft: "30px" }}>
            <h2>Ravi Sharma</h2>
            <p>Software Developer</p>
            <hr />
            <ProgressInstance />
            <div className={QuizStatusBoardStyle.statusData}>
              <div
                className={QuizStatusBoardStyle.statusDataItem}
                style={{
                  backgroundColor: "black",
                }}
              >
                <big>400</big>
                <p>Total</p>
              </div>
              <div
                className={QuizStatusBoardStyle.statusDataItem}
                style={{
                  backgroundColor: "green",
                }}
              >
                <big>50</big>
                <p>Correct</p>
              </div>
              <div
                className={QuizStatusBoardStyle.statusDataItem}
                style={{
                  backgroundColor: "red",
                }}
              >
                <big>100</big>
                <p>Wrong</p>
              </div>

              <div
                className={QuizStatusBoardStyle.statusDataItem}
                style={{
                  backgroundColor: "darkgreen",
                }}
              >
                <big>350</big>
                <p>Unattempt</p>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <Row className={QuizStatusBoardStyle.bottomRow}>
        <Col>
          <h4>Your Achievements</h4>
          <p>Your Rank: 10222</p>
          <p>Your Rank:</p>
          <p>Your Rank:</p>
        </Col>
        <Col>
          <h4>Badges</h4>
          <p>HuntClear Badge</p>
          <p>FastGuru Badge</p>
          <p>The Master Badge</p>
          <p>Fighter Badge</p>
        </Col>
      </Row>
    </Container>
  );
};
export default QuizStatusBoard;

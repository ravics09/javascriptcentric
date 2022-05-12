import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import aboutUsStyle from "./aboutUs.module.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import LEADER_IMG from "../../assets/images/leader.jpeg";
import PLACEHOLDER_IMG from "../../assets/images/h1.png";

const AboutUs = () => {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );

  return (
    <Container className={aboutUsStyle.container}>
      <Row className="justify-content-md-center mb-2">
        <Col md="auto">
          <h4>About JavaScript Centric</h4>
        </Col>
      </Row>
      <ColoredLine color="gray" />
      <Row className="justify-content-md-center mb-5">
        <Col md="auto">
          <article>
            <p>
              JavaScript Centric is a platform of software developers getting
              together to help one another out. The software industry relies on
              collaboration and networked learning. We provide a place for that
              to happen. Our application is open source, meaning you can inspect
              every little detail of the code, or chip in yourself! We are
              working to make our platform available for anyone to stand up
              similar communities in any niche or passion. We believe in
              transparency and adding value to the ecosystem. We hope you poke
              around and like what you see!
            </p>
          </article>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-2">
        <Col md="auto">
          <h4>Services Offered</h4>
        </Col>
      </Row>
      <ColoredLine color="gray" />
      <Row className="justify-content-md-center mb-5">
        <Col md={3}>
          <div
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <article>
              <h4>400+ Interview Questions</h4>
              <p>
                JavaScript Centric Provides more then 400 interview question
                which helps you to prepare for any javascript interview. We
                covered almost all important questions from basic to advance
                level with the exact answers.
              </p>
            </article>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <article>
              <h4>100+ Coding Challenge</h4>
              <p>
                JavaScript Centric Provides different varity of coding problems
                that helps you in coding round of any big MNC like Amazon,
                Google, Flipkart, Paytm, Wallmart and many more.
              </p>
            </article>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <article>
              <h4>100+ Programs</h4>
              <p>
                JavaScript Centric have more then 100 basic to advance level
                programs that can help you to solve problems. and helps you for
                any coding challenge.
              </p>
            </article>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <article>
              <h4>JS Data Structure</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                architecto vero, omnis harum, illo quo ex voluptas et quae
                incidunt tenetur ipsam dolorem, ullam similique voluptatibus vel
                rerum non reprehenderit.
              </p>
            </article>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-2">
        <Col md="auto">
          <h4>Meet Our Team Giriboss</h4>
        </Col>
      </Row>
      <ColoredLine color="gray" />
      <Row className="justify-content-md-center mb-5">
        <Col md="auto">
          <article>
            <p>
              We have team of 4 members who are working on different cut-off
              technologies.
            </p>
          </article>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-2">
        <Col style={{ color: "black" }} md={3}>
          <Card>
            <Card.Img variant="top" src={LEADER_IMG} height={300}/>
            <Card.Body>
              <Card.Title>Ravi Sharma</Card.Title>
              <Card.Text>
                By Profession A Software Engineer. Having 5+ Year Of Experience
                In Web And Mobile App Deveoplement.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="https://www.linkedin.com/in/ravics09/">
                LinkedIn
              </Card.Link>
              <Card.Link href="https://github.com/ravics09">GitHub</Card.Link>
              <Card.Link href="https://javascriptcentric.medium.com/">
                Medium
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{ color: "black" }} md={3}>
          <Card>
            <Card.Img variant="top" src={PLACEHOLDER_IMG} height={300}/>
            <Card.Body>
              <Card.Title>Sonu Mishra</Card.Title>
              <Card.Text>
                By Profession A Software Engineer. Having 5+ Year Of Experience
                In Web And Mobile App Deveoplement.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="https://www.linkedin.com/in/ravics09/">
                LinkedIn
              </Card.Link>
              <Card.Link href="https://github.com/ravics09">GitHub</Card.Link>
              <Card.Link href="https://javascriptcentric.medium.com/">
                Medium
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{ color: "black" }} md={3}>
          <Card>
            <Card.Img variant="top" src={PLACEHOLDER_IMG} height={300}/>
            <Card.Body>
              <Card.Title>Jay Verma</Card.Title>
              <Card.Text>
                By Profession A Software Engineer. Having 5+ Year Of Experience
                In Web And Mobile App Deveoplement.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="https://www.linkedin.com/in/ravics09/">
                LinkedIn
              </Card.Link>
              <Card.Link href="https://github.com/ravics09">GitHub</Card.Link>
              <Card.Link href="https://javascriptcentric.medium.com/">
                Medium
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{ color: "black" }} md={3}>
          <Card>
            <Card.Img variant="top" src={PLACEHOLDER_IMG} height={300}/>
            <Card.Body>
              <Card.Title>Varun Sharma</Card.Title>
              <Card.Text>
                By Profession A Software Engineer. Having 5+ Year Of Experience
                In Web And Mobile App Deveoplement.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="https://www.linkedin.com/in/ravics09/">
                LinkedIn
              </Card.Link>
              <Card.Link href="https://github.com/ravics09">GitHub</Card.Link>
              <Card.Link href="https://javascriptcentric.medium.com/">
                Medium
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default AboutUs;

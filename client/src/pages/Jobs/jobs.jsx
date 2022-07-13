import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import JobsStyle from "./jobs.module.css";

const Jobs = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={JobsStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col md={2} xl={2}>
            <div className={JobsStyle.leftPanel}>
              <div className={JobsStyle.title}>
                <span>Filter</span>
              </div>
              <div className={JobsStyle.leftPanelBody}>
                <p>Java Script</p>
                <p>Node JS</p>
                <p>React Js</p>
                <p>Mongo DB</p>
                <p>React Native</p>
              </div>
            </div>
          </Col>
          <Col md={7} xl={7} xs={12}>
            <div className={JobsStyle.mainPanel}>
              <div className={JobsStyle.title}>
                <span>Latest Jobs</span>
              </div>
              <div className={JobsStyle.mainPanelBody}>
                <h3>Jobs card will display here</h3>
              </div>
            </div>
          </Col>
          <Col md={3} xl={3}>
            <div className={JobsStyle.rightPanel}>
              <div className={JobsStyle.title}>
                <span>Paid Services</span>
              </div>
              <div className={JobsStyle.rightPanelBody}>
                <p>Resume Review</p>
                <p>Resume Builder</p>
                <p>Mock Interview</p>
                <p>Take Online Quiz</p>
              </div>
              <div className={JobsStyle.joinMembership}>
                <span>Join Us</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default Jobs;

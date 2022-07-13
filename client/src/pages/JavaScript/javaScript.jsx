import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Image, Breadcrumb } from "react-bootstrap";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import JavaScriptStyle from "./javaScript.module.css";
const jsData = [
  {
    id: 1,
    topic: "How JavaScript Works ?",
    description:
      "One of the complicated topic in javascript is closure. Its is combination of lexical scope and function",
  },
  {
    id: 2,
    topic: "Closure in JavaScript",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 3,
    topic: "First Class Function",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 4,
    topic: "Factory Function",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 5,
    topic: "Currying in JavaScript",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 6,
    topic: "Currying",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 7,
    topic: "First Class Function",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 8,
    topic: "Factory Function",
    description: "its is combination of lexical scope and function",
  },
];

const JavaScript = () => {
  const [data, setData] = useState(jsData);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (data.length === 0) {
      setData(jsData);
    }
  });

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container className={JavaScriptStyle.container}>
        <Row>
          <Col md={9} xl={9} xs={12}>
            <div className={JavaScriptStyle.body}>
              <div className={JavaScriptStyle.breadCrumb}>
                <Breadcrumb as="h5">
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Topics</Breadcrumb.Item>
                  <Breadcrumb.Item active>Java Script</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              {data.map((item) => (
                <div key={item.id} className={JavaScriptStyle.renderCard}>
                  <Image
                    src="https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo.jpg"
                    className={JavaScriptStyle.cardImage}
                  />
                  <div className={JavaScriptStyle.cardBody}>
                    <h4 style={{ color: "white" }}>{item.topic}</h4>
                    <h5 style={{ color: "gray" }}>{item.description}</h5>
                    <h5 style={{ color: "gray" }}>2 min Read</h5>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default JavaScript;

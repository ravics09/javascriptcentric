import React, { useState, useEffect, Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import Imgix from "react-imgix";

import Navbar from "../../components/navbar";
import JavaScriptStyle from "./javaScript.module.css";
import ListComponent from "./../../components/listComponent";

const jsData = [
  {
    id: 1,
    topic: "Closure",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 2,
    topic: "Currying",
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
    topic: "Closure",
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
      <Navbar showSearchBar={true} />
      <Container
        className={JavaScriptStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <div className={JavaScriptStyle.header}>
            <Imgix
              src="https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo.jpg"
              width={200}
              height={200}
            />
            <h2>Java Script</h2>
            <h5>JavaScript Developer who loves to make incredible apps.</h5>
          </div>
        </Row>
        <Row>
          <ListComponent items={data} />
        </Row>
        <Row>
          <div className={JavaScriptStyle.footer}>
            <h3>This is footer of this page.</h3>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};
export default JavaScript;

import React, { useState, useEffect, Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import Imgix from "react-imgix";

import Navbar from "../../components/navbar";
import NodeJSStyle from "./nodeJS.module.css";
import ListComponent from "./../../components/listComponent";

const nodeData = [
  {
    id: 1,
    topic: "Buffer",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 2,
    topic: "Cluster Module",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 3,
    topic: "module.exports",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 4,
    topic: "package.json",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 5,
    topic: "package.lock.json",
    description: "its is combination of lexical scope and function",
  },
  {
    id: 6,
    topic: "Event loop",
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

const NodeJS = () => {
  const [data, setData] = useState(nodeData);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (data.length === 0) {
      setData(nodeData);
    }
  });

  return (
    <Fragment>
      <Navbar showSearchBar={true} />
      <Container
        className={NodeJSStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <div className={NodeJSStyle.header}>
            <Imgix
              src="https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo.jpg"
              width={200}
              height={200}
            />
            <h2>NodeJS</h2>
            <h5>NodeJS Developer who loves to make incredible backend apps.</h5>
          </div>
        </Row>
        <Row>
          <ListComponent items={data} />
        </Row>
        <Row>
          <div className={NodeJSStyle.footer}>
            <h3>This is footer of this page.</h3>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};
export default NodeJS;

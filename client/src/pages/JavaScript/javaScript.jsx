import React, { useState, useEffect, Fragment } from "react";
import { Row, Container, Image } from "react-bootstrap";
import Imgix from "react-imgix";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import JavaScriptStyle from "./javaScript.module.css";
import ListComponent from "./../../components/listComponent";
import DEVELOPER_IMG from "../../assets/images/developer.png";
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
      <Navbar showSearchBar={false} />
      <div
        style={{
          backgroundColor: "#181a1f",
          paddingTop: "150px",
          paddingBottom: "50px",
        }}
      >
        <Container>
          <Row>
            <div className={JavaScriptStyle.header}>
              <Image src={DEVELOPER_IMG} width={200} height={200} />
              <h2 style={{ padding: "10px" }}>Ravi Sharma</h2>
              <h5 style={{ color: "gray" }}>
                JavaScript Developer who loves to make incredible apps.
              </h5>
            </div>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#fff", color: "black" }}>
        <Container>
          <Row>
            <ListComponent items={data} />
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};
export default JavaScript;

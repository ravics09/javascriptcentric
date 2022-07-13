import React, { useState, useEffect, Fragment } from "react";
import { Row, Container, Image } from "react-bootstrap";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import NodeJSStyle from "./nodeJS.module.css";
import DEVELOPER_IMG from "../../assets/images/developer.png";
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
            <div className={NodeJSStyle.header}>
              <Image src={DEVELOPER_IMG} width={200} height={200} />
              <h2 style={{ padding: "10px" }}>Ravi Sharma</h2>
              <h5 style={{ color: "gray" }}>
                NodeJS Developer who loves backend apps.
              </h5>
            </div>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#fff", color: "black" }}>
        <Container>
          <Row>
            {data.map((item) => (
              <div key={item.id} className={NodeJSStyle.renderCard}>
                <Image
                  src="https://1000logos.net/wp-content/uploads/2020/09/JavaScript-Logo.jpg"
                  width={500}
                  height={200}
                  style={{ padding: "10px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                  }}
                >
                  <h4 style={{ color: "black" }}>{item.topic}</h4>
                  <h5 style={{ color: "gray" }}>{item.description}</h5>
                  <h5 style={{ color: "gray" }}>2 min Read</h5>
                </div>
              </div>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};
export default NodeJS;

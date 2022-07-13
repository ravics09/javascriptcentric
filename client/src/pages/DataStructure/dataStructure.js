import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import DataStructureStyle from "./dataStructure.module.css";

const DSTopic = [
  {
    id: 1,
    name: "Array",
    data: [],
  },
  {
    id: 2,
    name: "Stack",
    data: [],
  },
  {
    id: 3,
    name: "Heap",
    data: [],
  },
  {
    id: 4,
    name: "Queue",
    data: [],
  },
  {
    id: 5,
    name: "Binary Tree",
    data: [],
  },
];

const DataStructure = () => {
  const [topic, setTopic] = useState();
  const [data, setData] = useState();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    setTopic("Array");
  }, []);

  const onSelectDSTopic = (e) => {
    e.preventDefault();
    setTopic(e.target.innerText);
  };
  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={DataStructureStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col md={2} xl={2} xs={12}>
            <div className={DataStructureStyle.leftPanel}>
              <div className={DataStructureStyle.title}>
                <span>JS Data Structure</span>
              </div>
              <div className={DataStructureStyle.leftPanelBody}>
                {DSTopic.map((item) => (
                  <Fragment key={item.id}>
                    <p
                      style={{ cursor: "poniter" }}
                      onClick={(e) => {
                        onSelectDSTopic(e);
                      }}
                    >
                      {item.name}
                    </p>
                  </Fragment>
                ))}
              </div>
            </div>
          </Col>
          <Col md={10} xl={10}>
            <div className={DataStructureStyle.rightPanel}>
              <div className={DataStructureStyle.title}>
                <span>{topic} Data Structure</span>
              </div>
              <div className={DataStructureStyle.rightPanelBody}>
                <h3>{topic}:</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default DataStructure;

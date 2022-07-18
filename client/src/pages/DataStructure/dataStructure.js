import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Parser from "html-react-parser";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import DataStructureStyle from "./dataStructure.module.css";
import DataStructureArray from "../../helpers/constant/dataStructure";

const DataStructure = () => {
  const [topic, setTopic] = useState("Array");
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
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
                {DataStructureArray && DataStructureArray.map((item) => (
                  <Fragment key={item.id}>
                    <p
                      style={{ cursor: "poniter" }}
                      onClick={(e) => {
                        onSelectDSTopic(e);
                      }}
                    >
                      {item.topicName}
                    </p>
                  </Fragment>
                ))}
              </div>
            </div>
          </Col>
          <Col md={10} xl={10}>
            <div className={DataStructureStyle.rightPanel}>
              {DataStructureArray &&
                DataStructureArray.filter((item) => {
                  return item.topicName.toLowerCase() === topic.toLowerCase();
                }).map((item) => (
                  <>
                    <div className={DataStructureStyle.title}>
                      <span>{topic} Data Structure</span>
                    </div>
                    <div className={DataStructureStyle.rightPanelBody}>
                      <article>{Parser(`${item.description}`)}</article>
                    </div>
                  </>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default DataStructure;

import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Image, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import NodeJSStyle from "./nodeJS.module.css";
import NodeTopics from "../../helpers/constant/nodeTopics";

const NodeJS = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(NodeTopics);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (data && data.length === 0) {
      setData(NodeTopics);
    }
  }, []);

  const handleSelectedTopic = (e, item) => {
    e.preventDefault();
    navigate(`/topics/${"nodejs"}/readtopic/${item.id}`);
  };

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container
        className={NodeJSStyle.container}
        style={{ minHeight: dimensions.height }}
      >
        <Row>
          <Col md={9} xl={9} xs={12}>
            <div className={NodeJSStyle.body}>
              <div className={NodeJSStyle.breadCrumb}>
                <Breadcrumb as="h5">
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Topics</Breadcrumb.Item>
                  <Breadcrumb.Item active>Node JS</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              {data.map((item) => (
                <div
                  key={item.id}
                  className={NodeJSStyle.renderCard}
                  onClick={(e) => {
                    handleSelectedTopic(e, item);
                  }}
                >
                  <Image
                    src={item.coverImage}
                    className={NodeJSStyle.cardImage}
                  />
                  <div className={NodeJSStyle.cardBody}>
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
export default NodeJS;

import React, { useState, useEffect, Fragment } from "react";
import { Row, Container, Image } from "react-bootstrap";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import JavaScriptStyle from "./javaScript.module.css";
import DEVELOPER_IMG from "../../assets/images/developer.png";

const ReadTopic = () => {
  const [data, setData] = useState();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (data.length === 0) {
      setData();
    }
  });
  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Footer/>
    </Fragment>
  );
};

export default ReadTopic;

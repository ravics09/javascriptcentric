import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBarStyle from "./navbar.module.css";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  InputGroup,
  FormControl,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { signout } from "../actions/authAction";
import PLACEHOLDER_IMG from "../assets/images/h1.png";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [dropdownActiveKey, setActiveKey] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { isLoggedIn, loggedInUser } = useSelector(
    (state) => state.AuthReducer
  );

  useEffect(() => {
    if (isLoggedIn) {
      setUserName(loggedInUser.fullName);
      setProfilePhoto(loggedInUser.profilePhoto);
    }
  }, [isLoggedIn]);

  const handleSelect = (key) => {
    setActiveKey(Math.trunc(key));
  };

  const handleLogout = async () => {
    dispatch(signout()).then((response) => {
      if (response.status === "success") {
        navigate("/", { replace: true });
      }
    });
  };

  const handleSearchText = async (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    alert("You searched for" + searchText);
    // setSearchText("")
  };

  // if (profilePhoto) {
  //   var imgstr = profilePhoto;
  //   imgstr = imgstr.replace("public", "");
  //   var profilePic = "http://localhost:9090" + imgstr;
  // } else {
  //   profilePic = PLACEHOLDER_IMG;
  // }

  return (
    <Navbar expand="md" bg="dark" fixed="top" className={NavBarStyle.container}>
      <Container>
        <Navbar.Brand className={NavBarStyle.navBrandLink}>
          <span style={{ color: "rgb(247, 220, 70)" }}>JavaScript </span>Centric
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              exact
              as={NavLink}
              to="/home"
              className={NavBarStyle.navLink}
              activeClassName={NavBarStyle.activeNavLink}
            >
              Home
            </Nav.Link>
            <Nav.Link
              exact
              as={NavLink}
              to="/jobs"
              className={NavBarStyle.navLink}
              activeClassName={NavBarStyle.activeNavLink}
            >
              Jobs
            </Nav.Link>
            <Nav.Link
              exact
              as={NavLink}
              to="/contactus"
              className={NavBarStyle.navLink}
              activeClassName={NavBarStyle.activeNavLink}
            >
              Contact
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Container>
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search here"
                  value={searchText}
                  aria-label="Search"
                  onChange={(e) => {
                    handleSearchText(e);
                  }}
                />
                <Button variant="dark" onClick={() => handleSearch()}>
                  Search
                </Button>
              </InputGroup>
            </Container>
          </Form>
          <NavDropdown
            title={
              <Image
                width={30}
                height={30}
                roundedCircle
                src={profilePhoto ? profilePhoto : PLACEHOLDER_IMG}
              />
            }
            id="navbarScrollingDropdown"
            className={NavBarStyle.navDropdownLink}
            eventKey={3}
          >
            <NavDropdown.Item exact as={NavLink} to="/account" eventKey={3.3}>
              @{userName?userName:null}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              exact
              as={NavLink}
              to="/createpost"
              eventKey={3.1}
            >
              Create Post
            </NavDropdown.Item>
            <NavDropdown.Item exact as={NavLink} to="/dashboard" eventKey={3.1}>
              Dashboard
            </NavDropdown.Item>
            <NavDropdown.Item
              exact
              as={NavLink}
              to="/readinglist"
              eventKey={3.2}
            >
              Readling List
            </NavDropdown.Item>
            <NavDropdown.Item
              exact
              as={NavLink}
              to="/selectquiztopic"
              eventKey={3.4}
            >
              Coding Quiz
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;

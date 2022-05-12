import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  Home,
  SignIn,
  SignUp,
  CreatePost,
  FullArticle,
  EditPost,
  Account,
  Dashboard,
  ReadingList,
  ForgetPassword,
  InterviewQuestions,
  Main,
  CodingChallenge,
  JavaScriptPrograms,
  ContactUs,
  AboutUs,
  Settings,
  ResetPassword,
  UserResetPassword,
  QuizStatusBoard,
  QuizTopic,
  OnlineQuiz,
  JavaScript,
  ReactJS,
  MongoDB,
  NodeJS,
  ReactNative,
} from "../pages/index";

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);

  const IsAuth = ({ children }) => {
    return isLoggedIn === true ? children : <Navigate to="/signin" replace />;
  };

  return (
    <Routes>
      <Route exact element={<SignIn />} path="/" />
      <Route exact element={<SignIn />} path="/signin" />
      <Route exact element={<SignUp />} path="/signup" />
      <Route
        exact
        element={
          <IsAuth>
            <Home />
          </IsAuth>
        }
        path="/home"
      />
      <Route
        exact
        element={
          <IsAuth>
            <CreatePost />
          </IsAuth>
        }
        path="/createpost"
      />
      <Route
        exact
        element={
          <IsAuth>
            <FullArticle />
          </IsAuth>
        }
        path="/fullarticle/:id"
      />
      <Route
        exact
        element={
          <IsAuth>
            <EditPost />
          </IsAuth>
        }
        path="/:id/editpost"
      />
      <Route
        exact
        element={
          <IsAuth>
            <Account />
          </IsAuth>
        }
        path="/account"
      />
      <Route
        exact
        element={
          <IsAuth>
            <Dashboard />
          </IsAuth>
        }
        path="/dashboard"
      />
      <Route
        exact
        element={
          <IsAuth>
            <ReadingList />
          </IsAuth>
        }
        path="/readinglist"
      />
      <Route exact element={<ForgetPassword />} path="/forgetpassword" />
      {/* <Route exact element={<Main/>} path="/main" />
      <Route exact element={<InterviewQuestions/>} path="/interviewquestions" />
      <Route exact element={<CodingChallenge/>} path="/codingchallenge" />
      <Route exact element={<JavaScriptPrograms/>} path="/programs" />
      <Route exact element={<ContactUs/>} path="/contactus" />
      <Route exact element={<AboutUs/>} path="/aboutus" />

      <Route exact element={<Settings/>} path="/settings" />

      <Route exact element={<ResetPassword/>} path="/resetpassword/:id/:token" />
      <Route exact element={<UserResetPassword/>} path="/userresetpassword" />
      <Route exact element={<FullArticle/>} path="/fullarticle/:id" />
      <Route exact element={<EditPost/>} path="/:id/editpost" />

      <Route exact element={<QuizTopic/>} path="/selectquiztopic" />
      <Route exact element={<QuizStatusBoard/>} path="/:id/quizstatusboard" />
      <Route exact element={<OnlineQuiz/>} path="/onlinequiz/:id" />
      <Route exact element={<JavaScript/>} path="/topic/javascript" />
      <Route exact element={<ReactJS/>} path="/topic/reactjs" />
      <Route exact element={<ReactNative/>} path="/topic/reactnative" />
      <Route exact element={<MongoDB/>} path="/topic/mongodb" />
      <Route exact element={<NodeJS/>} path="/topic/nodejs" /> */}
    </Routes>
  );
};

export default AppRoutes;

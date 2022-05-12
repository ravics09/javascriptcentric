import React, { useState, useEffect } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import JavaScriptStyle from "./javaScript.module.css";
import PROTOTYPE_CHAIN_IMG from "../../assets/images/prototypeChain.png";

const JavaScript = () => {
  const history = useNavigate();
  const [section, setSection] = useState("importantlink");

  const selectJavaScriptTopic = (topic) => {
    switch (topic) {
      case "interviewquestions":
        setSection("interviewquestions");
        break;
      case "programs":
        setSection("programs");
        break;
      case "onlinequiz":
        history.push(`/${"javascript"}/quizstatusboard`);
        break;
      case "projects":
        setSection("projects");
        break;
      case "importantlink":
        setSection("importantlink");
        break;
    }
  };

  const ImportantLink = () => {
    return (
      <>
        <Row className={JavaScriptStyle.topRow}>
          <h2>Important Links</h2>
        </Row>
        <Row className={JavaScriptStyle.topicRow}>
          <div>
            <article>
              <h3>1. Call Stack Reference</h3>
              <h4>Articles</h4>
              <ul>
                <li>
                  <a href="https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec">
                    Understanding Javascript Call Stack, Event Loops — Gaurav
                    Pandvia
                  </a>
                </li>
                <li>
                  <a href="https://medium.freecodecamp.org/understanding-the-javascript-call-stack-861e41ae61d4">
                    Understanding the JavaScript Call Stack — Charles Freeborn
                  </a>
                </li>
                <li>
                  <a href="https://web.archive.org/web/20180701233338/https://www.valentinog.com/blog/js-execution-context-call-stack/">
                    Javascript: What Is The Execution Context? What Is The Call
                    Stack? — Valentino Gagliardi
                  </a>
                </li>
                <li>
                  <a href="https://gist.github.com/jesstelford/9a35d20a2aa044df8bf241e00d7bc2d0">
                    What is the JS Event Loop and Call Stack? — Jess Telford
                  </a>
                </li>
                <li>
                  <a href="https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0">
                    Understanding Execution Context and Execution Stack in
                    Javascript — Sukhjinder Arora
                  </a>
                </li>
                <li>
                  <a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf">
                    How JavaScript Works: An Overview of the Engine, the
                    Runtime, and the Call Stack — Alexander Zlatkov
                  </a>
                </li>
                <li>
                  <a href="https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/">
                    The Ultimate Guide to Execution Contexts, Hoisting, Scopes,
                    and Closures in JavaScript — Tyler McGinnis
                  </a>
                </li>
                <li>
                  <a href="https://dev.to/bipinrajbhar/how-javascript-works-under-the-hood-an-overview-of-javascript-engine-heap-and-call-stack-1j5o">
                    How JavaScript Works Under The Hood: An Overview of
                    JavaScript Engine, Heap and, Call Stack — Bipin Rajbhar
                  </a>
                </li>
              </ul>
              <h4>Videos</h4>
              <ul>
                <li>
                  <a href="https://www.youtube.com/watch?v=w6QGEiQceOM">
                    Javascript: the Call Stack explained — Coding Blocks India
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=W8AeMrVtFLY">
                    The JS Call Stack Explained In 9 Minutes — Colt Steele
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=w7QWQlkLY_s">
                    What is the Call Stack? — Eric Traub
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Q2sFmqvpBe0">
                    The Call Stack — Kevin Drumm
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Z6a1cLyq7Ac&list=PLWrQZnG8l0E4kd1T_nyuVoxQUaYEWFgcD">
                    Understanding JavaScript Execution — Codesmith
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Nt-qa_LlUH0">
                    The Ultimate Guide to Execution Contexts, Hoisting, Scopes,
                    and Closures in JavaScript — Tyler McGinnis
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">
                    What the heck is the event loop anyway? — Philip Roberts
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=ygA5U7Wgsg8">
                    La PILA DE EJECUCIÓN (Call Stack) de JavaScript — La Cocina
                    del Código
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=iLWTnMzWtj4&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP">
                    How JavaScript Code is executed? ❤️& Call Stack — Akshay
                    Saini
                  </a>
                </li>
              </ul>
            </article>
            <hr />
            <article>
              <h3>2. Primitive Types</h3>
              <h4>Articles</h4>
              <ul>
                <li>
                  <a href="http://2ality.com/2012/04/number-encoding.html">
                    How numbers are encoded in JavaScript — Dr. Axel Rauschmayer
                  </a>
                </li>
                <li>
                  <a href="https://indepth.dev/posts/1139/here-is-what-you-need-to-know-about-javascripts-number-type">
                    What You Need to Know About JavaScript Number Type — Max
                    Wizard K
                  </a>
                </li>
                <li>
                  <a href="https://blog.chewxy.com/2014/02/24/what-every-javascript-developer-should-know-about-floating-point-numbers/">
                    What Every JavaScript Developer Should Know About Floating
                    Point Numbers — Chewxy
                  </a>
                </li>
                <li>
                  <a href="https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/">
                    The Secret Life of JavaScript Primitives — Angus Croll
                  </a>
                </li>
                <li>
                  <a href="https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0">
                    Understanding
                  </a>
                </li>
                <li>
                  <a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf">
                    How Java
                  </a>
                </li>
                <li>
                  <a href="https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/">
                    The Ultimate
                  </a>
                </li>
                <li>
                  <a href="https://dev.to/bipinrajbhar/how-javascript-works-under-the-hood-an-overview-of-javascript-engine-heap-and-call-stack-1j5o">
                    How JavaScript
                  </a>
                </li>
              </ul>
              <h4>Videos</h4>
              <ul>
                <li>
                  <a href="https://www.youtube.com/watch?v=w6QGEiQceOM">
                    Javascript:
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=W8AeMrVtFLY">
                    The JS Call Saini
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=w7QWQlkLY_s">
                    What is the
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Q2sFmqvpBe0">
                    The Call St
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Z6a1cLyq7Ac&list=PLWrQZnG8l0E4kd1T_nyuVoxQUaYEWFgcD">
                    Understand
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=Nt-qa_LlUH0">
                    The Ultimate
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">
                    What the heck is
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=ygA5U7Wgsg8">
                    La PILA DE EJECUCI
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=iLWTnMzWtj4&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP">
                    How JavaScript C
                  </a>
                </li>
              </ul>
            </article>
            <hr />
            <article>
              <h3>3. Value Types and Reference Types</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>
                4. Implicit, Explicit, Nominal, Structuring and Duck Typing
              </h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>5. == vs === vs typeof</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>6. Function Scope, Block Scope and Lexical Scope</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>7. Expression vs Statement</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>8. IIFE, Modules and Namespaces</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>9. Message Queue and Event Loop</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>10. setTimeout, setInterval and requestAnimationFrame</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>11. JavaScript Engines</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>12. Bitwise Operators, Type Arrays and Array Buffers</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>13. DOM and Layout Trees</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>14. Factories and Classes</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>15. this, call, apply and bind</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>16. new, Constructor, instanceof and Instances</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>17. Prototype Inheritance and Prototype Chain</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>18. Object.create and Object.assign</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>19. map, reduce, filter</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>
                20. Pure Functions, Side Effects, State Mutation and Event
                Propagation
              </h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>21. Closures</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>22. High Order Functions</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>23. Recursion</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>24. Collections and Generators</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>25. Promises</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>26. async/await</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>27. Data Structures</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>28. Expensive Operation and Big O Notation</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>29. Algorithms</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>30. Inheritance, Polymorphism and Code Reuse</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>31. Design Patterns</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>32. Partial Applications, Currying, Compose and Pipe</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
            <article>
              <h3>33. Clean Code</h3>
              <h4>Articles</h4>
              <h4>Videos</h4>
            </article>
            <hr />
          </div>
        </Row>
        <Row className={JavaScriptStyle.topRow}>
          <h2>Helpful Youtube Channels</h2>
        </Row>
        <Row className={JavaScriptStyle.topicRow}>
          <div>
            <p>
              1. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              2. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              3. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              4. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              5. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              6. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              7. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
            <p>
              8. <a href="https://devdocs.io/javascript/">devdocs.io</a>
            </p>
          </div>
        </Row>
      </>
    );
  };

  const InterviewQuestions = () => {
    return (
      <>
        <Row className={JavaScriptStyle.topRow}>
          <h2>Interview Questions</h2>
        </Row>
        <Container>
          <Row className={JavaScriptStyle.interviewQuestion}>
          <article className={JavaScriptStyle.questionSection}>
              <h4>1.What are the possible ways to create objects in JavaScript</h4>
              <blockquote>
                ---- proto property whereas
                prototype on constructors function is available through
                Object.prototype.
              </blockquote>
              <blockquote>
              Link-<a href="https://youtu.be/HRP-5MS9DkQ">7 Different Ways To Create Objects In Javascript ?</a>
              </blockquote>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>2.What is Clouser and When it is created ?</h4>
              <p></p>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>3.What is a prototype chain</h4>
              <blockquote>
                Prototype chaining is used to build new types of objects based
                on existing ones. It is similar to inheritance in a class based
                language.The prototype on object instance is available through
                Object.getPrototypeOf(object) or proto property whereas
                prototype on constructors function is available through
                Object.prototype.
              </blockquote>
              <Image src={PROTOTYPE_CHAIN_IMG} style={{ width: "100%" }} />
            </article>

            <article className={JavaScriptStyle.questionSection}>
              <h4>4.What is the difference between Call, Apply and Bind</h4>
              <blockquote>
                The difference between Call, Apply and Bind can be explained
                with below examples.
              </blockquote>
              <blockquote>
                Call: The call() method invokes a function with a given this
                value and arguments provided one by one.
              </blockquote>
              <pre
                style={{
                  padding: 10,
                  backgroundColor: "#181A1F",
                  color: "white",
                }}
              >
                {`var employee1 = {firstName: 'John', lastName: 'Rodson'};
var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};
                  
function invite(greeting1, greeting2) {
  console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
}
                  
invite.call(employee1, 'Hello', 'How are you?'); // Hello John Rodson, How are you?
invite.call(employee2, 'Hello', 'How are you?'); // Hello Jimmy Baily, How are you?
`}
              </pre>
              <blockquote>
                Apply: Invokes the function with a given this value and allows
                you to pass in arguments as an array
              </blockquote>
              <pre
                style={{
                  padding: 10,
                  backgroundColor: "#181A1F",
                  color: "white",
                }}
              >
                {`var employee1 = {firstName: 'John', lastName: 'Rodson'};
var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};

function invite(greeting1, greeting2) {
  console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
}

invite.apply(employee1, ['Hello', 'How are you?']); // Hello John Rodson, How are you?
invite.apply(employee2, ['Hello', 'How are you?']); // Hello Jimmy Baily, How are you?`}
              </pre>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>5.What is JSON and its common operations</h4>
              <blockquote>
                JSON is a text-based data format following JavaScript object
                syntax, which was popularized by Douglas Crockford. It is useful
                when you want to transmit data across a network and it is
                basically just a text file with an extension of .json, and a
                MIME type of application/json
              </blockquote>
              <blockquote>
                Parsing: Converting a string to a native object
              </blockquote>
              <pre
                style={{
                  padding: 10,
                  backgroundColor: "#181A1F",
                  color: "white",
                }}
              >
                JSON.parse(text)
              </pre>
              <blockquote>
                Stringification: converting a native object to a string so it
                can be transmitted across the network
              </blockquote>
              <pre
                style={{
                  padding: 10,
                  backgroundColor: "#181A1F",
                  color: "white",
                }}
              >
                JSON.stringify(object)
              </pre>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>6.What is JSON and its common operations</h4>
              <p></p>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>7.What is JSON and its common operations</h4>
              <p></p>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>8.What is JSON and its common operations</h4>
              <p></p>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>9.What is JSON and its common operations</h4>
              <p></p>
            </article>
            <article className={JavaScriptStyle.questionSection}>
              <h4>10.What is JSON and its common operations</h4>
              <p></p>
            </article>
          </Row>
        </Container>
      </>
    );
  };

  const Programs = () => {
    return (
      <>
        <Row className={JavaScriptStyle.topRow}>
          <h2>Programs</h2>
        </Row>
        <Container>
          <Row className={JavaScriptStyle.programs}>
            <div className={JavaScriptStyle.programSection}>
              <p>Program 1</p>
              <p>link 1</p>
            </div>
          </Row>
        </Container>
      </>
    );
  };

  const Projects = () => {
    return (
      <>
        <Row className={JavaScriptStyle.topRow}>
          <h2>Basic Projects Ideas</h2>
        </Row>
        <Container>
          <Row className={JavaScriptStyle.projects}>
            <div className={JavaScriptStyle.projectSection}>
              <article>
                <h4>1.A Simple To-Do List App</h4>
                <p>
                  While building a to-do list using JavaScript, you'll learn the
                  basic logic behind CRUD actions and explore the event handling
                  functions of JavaScript. Essentially, you'll craft your script
                  to create tasks, read, update, and then delete them. Using
                  event handlers, you'll instantiate forms for entering every
                  task and display them on submission.
                  <br />
                  <br />
                  Once the JavaScript code for controlling your app's
                  functionality works, you can then use the CSS grid display
                  method to organize each task. Then assign priority to them
                  using the JavaScript conditional statement and date methods.
                  <br />
                  <br />
                  Although it's not mandatory, you can take this further by
                  saving tasks into a local database. Storing each input into a
                  JSON file on your local machine, for instance, gives you an
                  idea of how to perform CRUD operations when dealing with a
                  real-life JSON object, an array, or a NoSQL database.
                </p>
              </article>
            </div>
            <div className={JavaScriptStyle.projectSection}>
              <article>
                <h4>2.Create a Simple Timer</h4>
                <p>
                  A timer is one of the easiest projects you can quickly execute
                  using JavaScript. Although this sounds pretty basic, it
                  teaches you how to automatically change the state of an
                  element at intervals using JavaScript.
                  <br />
                  <br />
                  To make it more unique, you can build a countdown timer that
                  stops at a user-specified value. You don't need to store any
                  entry into a database or a JSON object, as this is an instance
                  that a user can tweak as they wish. <br />
                  <br /> While coding the timer, you'll familiarize yourself
                  with JavaScript functions. Plus, you'll learn how to write
                  JavaScript code for basic mathematical conversions as you
                  might need to convert some time parameters.
                </p>
              </article>
            </div>

            <div className={JavaScriptStyle.projectSection}>
              <article>
                <h4>3.Build an Image Carousel From Scratch</h4>
                <p>
                  A carousel is one of the most visually appealing additions to
                  a website's UI. When coupled with great UX, it adds a sleek
                  effect to your UI. Plus, it lets you display images or items
                  uniquely. <br />
                  <br />
                  To build a functional and reactive carousel, you'll need to
                  get your hands dirty with the JavaScript loop. You can get
                  your images from the DOM and push them into an empty
                  JavaScript array. You'll then add click events to a next and a
                  previous button to display images successively, either to the
                  right or the left. <br />
                  <br />
                  That's not a strict approach, though. You can use any method
                  that works best for you. If you're curious and want to go the
                  extra mile, you can add animations to your display to make
                  this more realistic and easy to use.
                </p>
              </article>
            </div>

            <div className={JavaScriptStyle.projectSection}>
              <article>
                <h4>4.Web Calculator</h4>
                <p>
                  JavaScript, like other programming languages, supports
                  numerous mathematical operations. So while coding this
                  project, you'll learn how to add click events to custom
                  buttons or divs and organize them to become a responsive
                  calculator that displays on the browser. <br />
                  <br />
                  If you're not familiar with them already, you might want to
                  start by playing around with JavaScript operators. And then
                  wrap your hands around event handlers to better understand the
                  concept behind them.
                </p>
              </article>
            </div>

            <div className={JavaScriptStyle.projectSection}>
              <article>
                <h4>5.Resume Generator With JavaScript</h4>
                <p>
                  Although you might be a bit confused on how to start on this
                  one, there are a couple of resume-building web apps out there
                  where you can grab your idea. <br />
                  <br />
                  Ultimately, you'll make a reusable resume builder that can
                  accept new information and drop or update existing ones.
                  Coming up with more resume templates isn't difficult once you
                  understand the basic logic. So, you can start with a single
                  template and scale up to more catchy designs as time goes on.
                  Of course, you also want to add a download button so users can
                  get their resume as a PDF.
                  <br />
                  <br />A resume-building project helps you understand basic
                  JavaScript CRUD operations. Additionally, you'll learn how to
                  use loops, event handlers, conditions, and some of the
                  built-in functions of JavaScript. You can also save users'
                  information in a JSON object so your program can reference it
                  later.
                </p>
              </article>
            </div>
          </Row>
          <Row className={JavaScriptStyle.topRow}>
            <h2>Advanced Projects Ideas</h2>
          </Row>
          <Row className={JavaScriptStyle.projects}>
            <div className={JavaScriptStyle.projectSection}>
              <p>link 1</p>
              <p>link 1</p>
              <p>link 1</p>
              <p>link 1</p>
              <p>link 1</p>
              <p>link 1</p>
            </div>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <Container className={JavaScriptStyle.container}>
      <Row className={JavaScriptStyle.topRow}>
        <h2>JavaScript</h2>
      </Row>
      <Row className={JavaScriptStyle.topicRow}>
        <Col>
          <div
            className={JavaScriptStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("importantlink")}
          >
            <p>Important Links</p>
          </div>
        </Col>
        <Col>
          <div
            className={JavaScriptStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("interviewquestions")}
          >
            <p>Interview Questions</p>
          </div>
        </Col>
        <Col>
          <div
            className={JavaScriptStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("programs")}
          >
            <p>Programs</p>
          </div>
        </Col>
        <Col>
          <div
            className={JavaScriptStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("projects")}
          >
            <p>Projects</p>
          </div>
        </Col>
        <Col>
          <div
            className={JavaScriptStyle.topicCard}
            style={{ cursor: "pointer" }}
            onClick={() => selectJavaScriptTopic("onlinequiz")}
          >
            <p>Online Quiz</p>
          </div>
        </Col>
      </Row>
      {
        {
          importantlink: <ImportantLink />,
          interviewquestions: <InterviewQuestions />,
          programs: <Programs />,
          projects: <Projects />,
        }[section]
      }
    </Container>
  );
};
export default JavaScript;

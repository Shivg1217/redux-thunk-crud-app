import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import PostList from "./components/postsList";
import { Container, Spinner } from "react-bootstrap";

const App = () => {
  const loader = useSelector((state) => state.loaderReducer.loader);
  return (
    <div className="App">
      {loader && (
        <div id="loading">
          <Spinner id="loading-content" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Container>
        <PostList />
      </Container>
    </div>
  );
};

export default App;

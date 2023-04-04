import { useEffect, useState } from "react";
import { getPosts } from '../api/index';
import Home from '../pages/Home';
import Loader from "./Loader";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Error from "../pages/Error";

function App() {

  const [post,setPost] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect( () => {

    const fetchPosts = async () =>{
      const response = await getPosts();
      if(response.success){
        setPost(response.data.posts);
        setLoader(false);
      }
    }

    fetchPosts();

  },[]);

  if(loading){
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home post = {post} />} />
          <Route path="/login" element = {<Login />} />
          <Route path="*" element = {<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { getPosts } from '../api/index';
import Home from '../pages/Home';
import Loader from "./Loader";
import Navbar from "./Navbar";

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
      <Navbar />
      <Home post = {post} />
    </div>
  );
}

export default App;

import Home from '../pages/Home';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Error from "../pages/Error";
import { useAuth } from '../hooks';
import Loader from './Loader';

function App() {

  const auth = useAuth();

  if(auth.loading){
    return (
      <Loader />
    );
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home post = {[]} />} />
          <Route path="/login" element = {<Login />} />
          <Route path="*" element = {<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

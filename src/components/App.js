import Home from '../pages/Home';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Error from "../pages/Error";
import { useAuth } from '../hooks';
import Loader from './Loader';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';

const PrivateRoute = ({children, ...rest}) =>{
  const auth = useAuth();
  return auth.user ? <Settings /> : <Navigate to='/login' />;
}

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
          <Route path='/signup' element = {<Signup />} />
          <Route path='/settings' element = {<PrivateRoute />} />
          <Route path="*" element = {<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

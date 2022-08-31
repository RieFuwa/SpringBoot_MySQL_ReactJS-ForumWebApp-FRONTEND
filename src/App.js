
import './App.css';
import {BrowserRouter, Routes , Route} from "react-router-dom"
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <NavBar></NavBar>
     <Routes>
      <Route exact path="/" element={<Home></Home>}></Route>
      <Route exact path="/users/:userId" element={<User></User>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

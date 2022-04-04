import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Eachproduct from './pages/Eachproduct';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/:name' element={<Eachproduct/>} />
          <Route path='/cart' element={<Cart/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

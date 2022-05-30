import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './tradingApp/Login';
import UserPage from './tradingApp/UserPage';
import StockPage from './tradingApp/StockPage';
import StyleContext from './tradingApp/StyleContext';

const style = {
  backgroundColor: 'lightcoral'
}

function App() {
  return (
    <Router>
      <StyleContext.Provider value={style}>
      <Routes>
        <Route exact path='/' element={ <LoginPage /> }></Route>
        <Route exact path='/user' element={ <UserPage /> }></Route>
        <Route exact path='/stock' element={ <StockPage /> }></Route>
      </Routes>
      </StyleContext.Provider>
    </Router>
  );
}

export default App;

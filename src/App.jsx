import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './App.css';
import PageNavigator from './pages/PageNavigator';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<PageNavigator />} />
      </Routes>
    </Router>
  )
}

export default App

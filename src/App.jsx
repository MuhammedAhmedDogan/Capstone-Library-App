import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PageNavigator from './pages/PageNavigator';
import './App.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<PageNavigator />} />
        <Route path="/:page/:id" element={<PageNavigator />} />
      </Routes>
    </Router>
  )
}

export default App

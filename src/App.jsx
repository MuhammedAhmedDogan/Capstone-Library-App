import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Author from './pages/author/Author';
import Book from './pages/book/Book';
import Category from './pages/category/Category';
import Publisher from './pages/publisher/Publisher';
import BookBorrowing from './pages/book_borrowing/BookBorrowing';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  return (
    <Router>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/books" element={<Book />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/publishers" element={<Publisher />} />
        <Route path="/borrows" element={<BookBorrowing />} />
      </Routes>
    </Router>
  )
}

export default App

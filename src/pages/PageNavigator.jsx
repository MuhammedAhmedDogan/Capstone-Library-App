import Author from './author/Author';
import Book from './book/Book';
import Category from './category/Category';
import Publisher from './publisher/Publisher';
import BookBorrowing from './book_borrowing/BookBorrowing';
import { useParams } from 'react-router-dom';

const PageNavigator = () => {
  const { page } = useParams();

  if (page === 'authors') return (<Author />);
  if (page === 'books') return (<Book />);
  if (page === 'categories') return (<Category />);
  if (page === 'publishers') return (<Publisher />);
  if (page === 'borrows') return (<BookBorrowing />);
  return(null);
}

export default PageNavigator;
import Categories from './category/Categories';
import Publishers from './publisher/Publishers';
import Authors from './author/Authors';
import Books from './book/Books';
import Borrows from './borrow/Borrows';

import CategoryEdit from './category/CategoryEdit';
import PublisherEdit from './publisher/PublisherEdit';
import AuthorEdit from './author/AuthorEdit';
import BookEdit from './book/BookEdit';
import BorrowEdit from './borrow/BorrowEdit';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PageNavigator = () => {
  const { page, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!['authors', 'books', 'categories', 'publishers', 'borrows'].includes(page)) {
      navigate('/');
    }
  }, [page, navigate]);

  if (id) {
    if (page === 'authors') return (<AuthorEdit />);
    if (page === 'books') return (<BookEdit />);
    if (page === 'categories') return (<CategoryEdit />);
    if (page === 'publishers') return (<PublisherEdit />);
    if (page === 'borrows') return (<BorrowEdit />);
  } else {
    if (page === 'authors') return (<Authors />);
    if (page === 'books') return (<Books />);
    if (page === 'categories') return (<Categories />);
    if (page === 'publishers') return (<Publishers />);
    if (page === 'borrows') return (<Borrows />);
  }
  return (null);
}

export default PageNavigator;
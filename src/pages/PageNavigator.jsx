import Authors from './author/Authors';
import Books from './book/Books';
import Categories from './category/Categories';
import Publishers from './publisher/Publishers';
import Borrows from './borrow/Borrows';

import CategoryEdit from './category/CategoryEdit';
import PublisherEdit from './publisher/PublisherEdit';
import { useParams } from 'react-router-dom';

const PageNavigator = () => {
  const { page, id } = useParams();

  if (id) {
    // if (page === 'authors') return (<AuthorEdit />);
    // if (page === 'books') return (<BookEdit />);
    if (page === 'categories') return (<CategoryEdit />);
    if (page === 'publishers') return (<PublisherEdit />);
    // if (page === 'borrows') return (<BookBorrowingEdit />);
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
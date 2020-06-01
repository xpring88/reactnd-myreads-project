import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import './../App.css';

const bookShelves = {
  currentlyReading: {type:'currentlyReading', name:'Currently Reading'},
  wantToRead: {type:'wantToRead', name:'Want to Read'},
  read: {type:'read', name:'Read'}
}

const ListBooks = props => {
  const { books, updateBook } = props;
  return (       
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(bookShelves).map(bookShelf => {
              const booksByShelf = books.filter(book => (book.shelf === bookShelf));
              return(
                <BookShelf key={bookShelf} updateBook={updateBook} type={bookShelves[bookShelf]} books={booksByShelf}/>
              )
		  })}
        </div>             
      </div>
      <div className="open-search">
        <Link to='/search' className='open-search-button'>Add a Book</Link>
      </div>
    </div>
    )
}

ListBooks.propTypes = {
	books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
};

export default ListBooks;

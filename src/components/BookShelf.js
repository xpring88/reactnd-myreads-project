import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


const BookShelf = props => {
  const { books, updateBook, type } = props;
  return (   
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ type.name }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map((book) => (
             <Book key={book.id} book={book} updateBook={updateBook} books={books} />
           ))
          }          
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
};

export default BookShelf;

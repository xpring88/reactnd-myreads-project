import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


const SearchResults = props => {
  const { books, newBooks, updateBook } = props;
  const booksResults = newBooks && newBooks.length > 0 ? 
      newBooks.map( newBook => (
        <Book key={newBook.id} book={newBook} updateBook={updateBook} books={books}/>
      )) : (<li>No Books</li>);
  return(
    <div className="search-books-results">
      <ol className="books-grid">
        { booksResults }          
      </ol>
    </div>
  ) 
}

SearchResults.propTypes = {
  books: PropTypes.array.isRequired,
  newBooks: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,  
};

export default SearchResults;

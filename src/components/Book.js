import React from 'react';
import PropTypes from 'prop-types';
import ChangerBookShelf from './ChangerBookShelf';


const Books = props => {
  const { book, updateBook, books } = props;
  
  return (   
    <li> 
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
          <ChangerBookShelf key={book.id} book={book} updateBook={updateBook} books={books}/>
        </div>
        <div className="book-title">{ book.title }</div>
        {book.authors && book.authors.map((author, index) => (
          <div key={index} className="book-authors">{author}</div>
        ))}         
      </div>
    </li>
  )
}

Books.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
};

export default Books;

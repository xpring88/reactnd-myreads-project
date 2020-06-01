import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './../utils/BooksAPI';
import SearchBarAutoComplete from './SearchBarAutoComplete';
import SearchResults from './SearchResults';

const suggestionList = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball',
      'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 
      'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 
      'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 
      'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 
      'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 
      'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
      'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 
      'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

 
class SearchPage extends React.Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  }
  
  state = {
    newBooks: [],
  }; 

  searchBooks = query => {
    BooksAPI.search(query)
    .then( newBooks => {
      this.setState({ newBooks });
    });
  }

  render() {
    const { searchBooks, state: { newBooks }, props: { updateBook, books } } = this;
	

    return (   
      <div className="search-books">
        <SearchBarAutoComplete searchBooks={searchBooks} suggestionList={suggestionList}/>
        <SearchResults books={books} newBooks={newBooks} updateBook={updateBook} />
      </div>   
    )
  }
}

export default SearchPage;

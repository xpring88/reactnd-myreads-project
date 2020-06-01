import React from 'react';
import PropTypes from 'prop-types';


class ChangerBookShelf extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.setDefaultValue(),
    }
  }
  
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }
  
  setDefaultValue = () => {
    const {book, books} = this.props;    
    if (!book.shelf){
      books && books.forEach( prevBook => {
        if(book.id === prevBook.id){
          book.shelf = prevBook.shelf;          
        }
      })
    }
    if(!book.shelf){
      book.shelf = 'none';
    }
    return book.shelf; 
  }

  onChange = event => {
  	this.props.updateBook(this.props.book, event.target.value);
  }

  render(){
    const {book} = this.props;      

    return (
      <div className="book-shelf-changer">
        <select defaultValue={book.shelf ? book.shelf : this.setDefaultValue} onChange={this.onChange}>
          <option value="move" disabled>Move to ...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>   
    ) 
  }
}

export default ChangerBookShelf;

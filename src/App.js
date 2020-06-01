import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './components/ListBooks'
import SearchPage from './components/SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount () {    
	BooksAPI.getAll()
	 .then( books => this.setState({ books }));
  }

  updateBook = (editedBook, shelf) => {
  	BooksAPI.update(editedBook, shelf)
    .then(res => {
      editedBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(book => book.id !== editedBook.id).concat(editedBook)
      }))
    });
  }
  
  render() {
	const { updateBook, state: { books } } =  this;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <ListBooks books={books} updateBook={updateBook} />             
              )} />
          <Route path="/search" render={() => (        
            <SearchPage books={books} updateBook={updateBook} />
              )} />
        </Switch>
	  </div>
    )
  }
}

export default BooksApp

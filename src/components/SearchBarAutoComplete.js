import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

class SearchBarAutoComplete extends React.Component {
  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    suggestionList: PropTypes.array.isRequired,
  }

  constructor(props){
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
    };
    this.onChangeDebounced = debounce(this.onChange);
  }  

  onChange = event => {
    const { suggestionList} = this.props;
    const userInput = event.currentTarget.value;
    
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestionList.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value
    });    
	
    
    if(userInput && filteredSuggestions){
      this.props.searchBooks(userInput);
    }    
  }

// Event fired when the user clicks on a suggestion
  onClick = event => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText
    });

    if(this.state.filteredSuggestions.length > 0 ){
      this.props.searchBooks(event.currentTarget.innerText);
    }   
  };

  // Event fired when the user presses a key down
  onKeyDown = event => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // User pressed the enter key, update the input and close the
    // suggestions
    if (event.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions...</em>
          </div>
        );
      }
    }
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close Search</Link>
        <div className="search-books-input-wrapper">
          {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input  type="text" placeholder="Search by title or author" 
              value={this.state.userInput || ''} 
              onChange={onChange}
              onKeyDown={onKeyDown}/>
          {suggestionsListComponent}         
        </div>
      </div>
    ) 
  }
}

export default SearchBarAutoComplete
import React, {Component} from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import SearchPagination from '../components/SearchPagination';
import ModalContainer from '../components/ModalContainer';
import LoaderContainer from './LoaderContainer';
import FilterContainer from '../components/FilterContainer';

// Class Container Component for SearchApp
const SearchApp = React.createClass({
     render() {
        
        return (
            <div id="appContainer" className="ui segment">

                <SearchForm />
            
                <FilterContainer />
            
                <SearchResults />
            
                <SearchPagination />
            
                <ModalContainer />
            
                <LoaderContainer />

            </div>
        )
    }
});

module.exports = SearchApp;
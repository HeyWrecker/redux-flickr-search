import React from 'react';
import {connect} from 'react-redux';
import Result from './Result';
import {setModalData} from '../actions';

// Displays the search term and will call the SearchResult component.
const SearchResultsList = React.createClass({
    propTypes:  {
        searchString: React.PropTypes.string,
        photos: React.PropTypes.array,
        page: React.PropTypes.number,
        pages: React.PropTypes.number,
        onThumbClick: React.PropTypes.func,
        status: React.PropTypes.string
        
    },
    
    getDefaultProps() {
        return {
            searchString: '',
            photos: [],
            page: 0,
            pages: 0,
            onThumbClick: function(){},
            status: ''
        };
    },
    
    render() {
        let props = this.props,
            componentDisplay,
            resultsPages;
    
        

        if(props.status == 'ok') {
            
            if(props.pages === 0) {
                resultsPages = "No results";
            } else {
                resultsPages = `Page ${props.page} of ${props.pages}`;
            }
            
            componentDisplay = 
                    <div>
                        <h1>
                            Search Results For "<em>{props.searchString}</em>"
                        </h1>
                        <div>
                            <p>
                                {resultsPages}
                            </p>
                        </div>
                        <div className="searchResultsList ui stackable six column grid">


                            {props.photos.map(photo => 
                                <Result
                                    key     = {parseInt(photo.id)}
                                    photo   = {parseInt(photo.id)}
                                    title   = {photo.title}
                                    farm    = {parseInt(photo.farm)}
                                    server  = {parseInt(photo.server)}
                                    secret  = {photo.secret}
                                    onThumbClick = {props.onThumbClick}
                                    description = {photo.description._content}>
                                >
                                    {photo.description._content}
                                </Result>
                            )}
                        </div>
                    </div>;
        } else if(props.status === 'Error: fail') {
            componentDisplay = 
                <h1>Whoops! The Flickr API must be down. Try your search again later.</h1>    
        } else {
        componentDisplay = <div></div>; 
        }
        
        return (
            <div>
                {componentDisplay}
            </div>
        )
    }
});

// Connects the Search Results container component to redux, 
// subscribing its children (SearchResultsList) to the store and passing in state
// and dispatch properties.
const mapStateToSearchResultsProps = (state) => {
    return {
        searchString: state.searchResults.searchString,
        photos: state.searchResults.photos,
        page: state.searchResults.page,
        pages: state.searchResults.pages,
        lastUpdated: state.searchResults.lastUpdated,
        status: state.searchResults.status
    }
};
const mapDispatchToSearchResultsProps = (dispatch) => {
    return {
        onThumbClick: (photo, title, farm, server, secret, description) => {
            dispatch(setModalData(photo, title, farm, server, secret, description));
        }
    }
};

const SearchResults = connect(mapStateToSearchResultsProps,mapDispatchToSearchResultsProps)(SearchResultsList);

module.exports = SearchResults;

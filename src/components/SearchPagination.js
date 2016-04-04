import React from 'react';
import {connect} from 'react-redux';
import {submitSearch} from '../actions'

// Functional component for the Pagination Controls.
let SearchPaginationControls = React.createClass({
    propTypes:  {
        searchString: React.PropTypes.string,
        page: React.PropTypes.number,
        pages: React.PropTypes.number,
        onPaginationClick: React.PropTypes.func,
        status: React.PropTypes.string,
        safeSearch: React.PropTypes.bool,
        sortOrder: React.PropTypes.string,
        licenseType: React.PropTypes.string
    },
    
    getDefaultProps() {
        return {
            searchString: '',
            page: 0,
            pages: 0,
            onPaginationClick: function(){},
            status: '',
            safeSearch: true,
            sortOrder: 'relevance',
            licenseType: 'none'
        };
    },
    
    render() {
        let props                   = this.props,
            prevPage                = props.page - 1,
            nextPage                = props.page + 1,
            displayStyle            = {},
            prevButtonDisplayStyle  = {},
            nextButtonDisplayStyle  = {};
        
        prevPage = prevPage <= 0 ? 1 : prevPage,
        nextPage = nextPage > props.pages ? props.pages : nextPage;
        
        if (props.status === 'Error: fail' || props.searchString === '') {
            displayStyle = {display: 'none'};
        }
        
        if((props.page - prevPage) === 0 || props.pages === 0) {
            prevButtonDisplayStyle = {display: 'none'};
        }
        
        if((props.page - nextPage) === 0 || props.pages === 0) {
            nextButtonDisplayStyle = {display: 'none'};
        }
        

        return (
            <div className="ui secondary menu" style={displayStyle}>
                <div className="right menu">
                    <form className="ui form">
                        <div className="inline fields">
                            <div className="field" style={prevButtonDisplayStyle}>
                                <button 
                                    className   = "ui button"
                                    type        = "submit"
                                    onClick     = {(e) => {
                                        e.preventDefault();
                                        props.onPaginationClick(props.searchString, prevPage, props.page, props.pages, props.safeSearch, props.sortOrder, props.licenseType);
                                    }}
                                    value       = {prevPage}>

                                        <i className="small arrow left icon"></i> Previous
                                </button>
                            </div>

                            <div className="field" style={nextButtonDisplayStyle}>
                                <button 
                                    className   = "ui button"
                                    type        = "submit"
                                    onClick     = {(e) => {
                                        e.preventDefault();
                                        props.onPaginationClick(props.searchString, nextPage, props.page, props.pages, props.safeSearch, props.sortOrder, props.licenseType);
                                    }}
                                    value       = {nextPage}>
                                        Next <i className="icon arrow right"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

// Connects the Search Pagination container component to redux, 
// subscribing its children (SearchPaginationControls) to the store and passing in state
// and dispatch properties.
const mapStateToPaginationProps = (state) => {
    return {
        searchString: state.searchResults.searchString,
        page: state.searchResults.page,
        pages: state.searchResults.pages,
        status: state.searchResults.status,
        safeSearch: state.searchResults.safeSearch,
        sortOrder: state.searchResults.sortOrder,
        licenseType: state.searchResults.licenseType
    } 
};
const mapDispatchToPaginationProps = (dispatch) => {
   
    return {
        onPaginationClick: (searchString, page, originalPage, pageTotal, safeSearch, sortOrder, licenseType) => {
            let dispatchPagination = true;
            
            if((originalPage - page) === 0) {
                dispatchPagination = false;
            }
            
            if(dispatchPagination === true) {
                dispatch(submitSearch(searchString, page, safeSearch, sortOrder, licenseType));
            }
        }
    };
};
const SearchPagination = connect(mapStateToPaginationProps, mapDispatchToPaginationProps)(SearchPaginationControls);

module.exports = SearchPagination;
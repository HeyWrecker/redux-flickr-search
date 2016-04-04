import React from 'react';
import {connect} from 'react-redux';
import {submitSearch} from '../actions';

// Functional Component for SearchForm
let SearchForm = React.createClass({
    propTypes:  {
        searchString: React.PropTypes.string,
        page: React.PropTypes.number,
        safeSearch: React.PropTypes.bool,
        sortOrder: React.PropTypes.string,
        licenseType: React.PropTypes.string
    },
    
    getDefaultProps() {
        return {
            searchString: '',
            page: 0,
            safeSearch: true,
            sortOrder: 'relevance',
            licenseType: 'none'
        };
    },
    
    render() {
        let props = this.props;
        console.log(props);
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="field twelve wide">
                        <label>Flickr Image Search</label>
                        <input
                            ref="input"
                            placeholder="Enter a search term..."
                        />
                    </div>
                    <div className="field four wide">
                        <button 
                            className="ui button"
                            style       = {{marginTop: '24px'}}
                            onClick     = {e => {
                                e.preventDefault();
                                if(this.refs.input.value !== '') {
                                    props.dispatch(submitSearch(this.refs.input.value, 1, props.safeSearch, props.sortOrder, props.licenseType));
                                    this.refs.input.value = '';
                                }
                            }}
                        >Submit
                        </button>
                    </div>
                </div>
            </form>
        )
    }
});

const mapStateToSearchFormProps = (state) => {
    return {
        searchString: state.searchResults.searchString,
        photos: state.searchResults.photos,
        page: state.searchResults.page,
        safeSearch: state.searchResults.safeSearch,
        sortOrder: state.searchResults.sortOrder,
        licenseType: state.searchResults.licenseType
    }
};

export default SearchForm = connect(mapStateToSearchFormProps)(SearchForm);


/*
function SearchForm({dispatch}) {
    let input;
    console.log(this.props)
    return (
        <form className="ui form">
            <div className="fields">
                <div className="field twelve wide">
                    <label>Flickr Image Search</label>
                    <input
                        ref={node => {input = node}}
                        placeholder="Enter a search term..."
                    />
                </div>
                <div className="field four wide">
                    <button 
                        className="ui button"
                        style       = {{marginTop: '24px'}}
                        onClick     = {e => {
                            e.preventDefault();
                            if(input.value !== '') {
                                dispatch(submitSearch(input.value, 1, 1));
                                input.value = '';
                            }
                        }}
                    >Submit
                    </button>
                </div>
            </div>
        </form>
    )
};
// Connects the react component to redux, subscribing it to the store.
export default SearchForm = connect()(SearchForm);
*/

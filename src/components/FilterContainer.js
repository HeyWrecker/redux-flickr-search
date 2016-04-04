import React from 'react';
import {connect} from 'react-redux';
import {safeSearchToggle, sortOrderChange, licenseTypeChange, submitSearch} from '../actions';

const FilterContent = React.createClass({
    propTypes:  {
        searchString: React.PropTypes.string,
        photos: React.PropTypes.array,
        page: React.PropTypes.number,
        safeSearch: React.PropTypes.bool,
        sortOrder: React.PropTypes.string,
        licenseType: React.PropTypes.string
    },
    
    getDefaultProps() {
        return {
            searchString: '',
            photos: [],
            page: 0,
            safeSearch: true,
            sortOrder: 'relevance',
            licenseType: 'none'
        };
    },
    
    componentWillReceiveProps(nextProps) {
       
        let props = this.props;
        
        if(nextProps.safeSearch !== props.safeSearch && props.searchString !== '') {
            props.dispatch(submitSearch(props.searchString, props.page, nextProps.safeSearch, nextProps.sortOrder, nextProps.licenseType));
        }
        
        if(props.sortOrder !== nextProps.sortOrder && props.searchString !== '') {
            props.dispatch(submitSearch(props.searchString, props.page, nextProps.safeSearch, nextProps.sortOrder, nextProps.licenseType));
        }
        
        if(props.licenseType !== nextProps.licenseType && props.searchString !== '') {
            props.dispatch(submitSearch(props.searchString, props.page, nextProps.safeSearch, nextProps.sortOrder, nextProps.licenseType));
        }
    },
    
    render() {

        let props = this.props,
            input,
            sortOrder,
            sortOrderValue,
            licenseType,
            licenseTypeValue;
        return(
            
            <div className="ui form">
                <div className="fields">
                    <div className="field three wide">
                        <div className="ui checkbox centered">
                            <input  type="checkbox" 
                                    ref={node => {input = node}}
                                    onChange = {e => {
                                        props.dispatch(safeSearchToggle(input.checked));
                                    }}
                                    defaultChecked />

                            <label>SafeSearch</label>
                        </div>
                    </div>
                    
                    <div className="field three wide">
                        <label className="left">Sort By</label>
                        <select className="ui dropdown" 
                                ref = {node => {sortOrder = node}}
                                onChange = {e => {
                                    sortOrderValue = sortOrder.options[sortOrder.options.selectedIndex].value;
                                    
                                    if(sortOrderValue !== '') {
                                        props.dispatch(sortOrderChange(sortOrderValue));
                                    }
                            }}>
                            <option value="relevance">Relevance</option>
                            <option value="date-posted-desc">Date Posted - Desc</option>
                            <option value="date-posted-asc">Date Posted - Asc</option>
                        </select>     
                    </div>
                            
                    <div className="field three wide">
                        <label className="left">License Type</label>
                        <select className="ui dropdown" 
                                ref = {node => {licenseType = node}}
                                onChange = {e => {
                                    licenseTypeValue = licenseType.options[licenseType.options.selectedIndex].value;
                                    
                                    if(licenseTypeValue !== '') {
                                        props.dispatch(licenseTypeChange(licenseTypeValue));
                                        console.log(licenseTypeValue)
                                    }
                            }}>
                            <option value="none">None</option>
                            <option value="is_commons">Flickr Commons</option>
                            <option value="is_getty">Getty Images</option>
                        </select>     
                    </div>
                </div>
            </div>
        )
    }
});

const mapStateToFilterProps = (state) => {
    return {
        searchString: state.searchResults.searchString,
        photos: state.searchResults.photos,
        page: state.searchResults.page,
        safeSearch: state.searchResults.safeSearch,
        sortOrder: state.searchResults.sortOrder,
        licenseType: state.searchResults.licenseType
    }
};

const mapDispatchToFilterProps = (dispatch) => {
    return {
        onSafeSearchChange: (searchString, page, safeSearch, sortOrder, licenseType) => {
            dispatch(submitSearch(searchString, page, safeSearch, sortOrder, licenseType));
        }    
    }
};


const FilterContainer = connect(mapStateToFilterProps)(FilterContent);

module.exports = FilterContainer;
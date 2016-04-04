import React from 'react';
import {connect} from 'react-redux';

const Loader = React.createClass({
    propTypes:  {
        isFetching: React.PropTypes.bool,
        isLoaderOpen: React.PropTypes.bool,
    },
    
    getDefaultProps() {
        return {
            isFetching: false,
            isLoaderOpen: false,
        };
    },
    
    render() {
        let props = this.props,
            componentDisplay,
            displayClassName;
        
        if(props.isLoaderOpen === false) {
            componentDisplay = "I am hidden";
            displayClassName = "modal-dimmer hidden";
        } else if (props.isLoaderOpen === true) {
            displayClassName = "modal-dimmer show";
        }
        
        
        return (
            <div className={displayClassName}>
                <div className="ui-loader loader"></div>
            </div>
        )
    }
});

const mapStateToLoader = (state) => {
    return {
        isFetching: state.loaderDisplay.isFetching,
        isLoaderOpen: state.loaderDisplay.isLoaderOpen
    }
};

const LoaderContainer = connect(mapStateToLoader)(Loader);

module.exports = LoaderContainer;
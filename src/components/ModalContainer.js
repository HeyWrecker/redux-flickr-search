import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../actions';

const ModalContent = React.createClass({
    propTypes:  {
        photo: React.PropTypes.number,
        title: React.PropTypes.string,
        farm: React.PropTypes.number,
        server: React.PropTypes.number,
        secret: React.PropTypes.string,
        description: React.PropTypes.string,
        isModalOpen: React.PropTypes.bool,
        onModalClose: React.PropTypes.func    
    },
    
    getDefaultProps() {
        return {
            photo: -1,
            title: '',
            farm: -1,
            server: -1,
            secret: '',
            description: '',
            isModalOpen: false,
            onModalClose: function(){}
        };
    },
    
    rawMarkup: function() {
        var rawMarkup = marked(this.props.description.toString(), {sanitize: false});
        return { __html: rawMarkup };
    },
    
    render() {
        let props   = this.props,
            imgURL,
            innerContent,
            modalClass,
            dimmerClass;
        
        if(props.isModalOpen == false) {
            modalClass = 'modal-content hidden';
            dimmerClass = 'modal-dimmer hidden';
        } else if(props.isModalOpen == true) {
            modalClass = 'modal-content show';
            dimmerClass = 'modal-dimmer show';
        }
        
        if(props.farm !== -1) {
            imgURL = 'http://farm' + props.farm + '.staticflickr.com/' + props.server + '/' + props.photo + '_' + props.secret + '_z.jpg';
        }

        if(props.description === '') {
            innerContent = <img className="image" src={imgURL} className="ui centered image" />;
        } else {
            innerContent =
                <div className="ui two column grid">
                    <div className="column">
                        <img className="image" src={imgURL} className="ui fluid image" />
                    </div>
                    <div className="column">
                        <div className="description">
                            <span dangerouslySetInnerHTML={this.rawMarkup()} />
                        </div>
                    </div>
                </div>;
        }

        return (
            <div className={dimmerClass}>
                <div id="modalContent" className={modalClass}>
                    <i  aria-label="close"
                        className="close icon"
                        onClick = {() => props.onModalClose(props.isModalOpen)}
                    >
                    </i>
                    <div className="header">{props.title}</div>
                    <div className="image content">
                        {innerContent}
                    </div>
                </div>
            </div>
        )
    }
});

// Connects the Search Results container component to redux, 
// subscribing its children (SearchResultsList) to the store and passing in state
// and dispatch properties.
const mapStateToModalContainerDisplay = (state) => {
    return {
        photo: state.modalDisplay.photo,
        title: state.modalDisplay.title,
        farm: state.modalDisplay.farm,
        server: state.modalDisplay.server,
        secret: state.modalDisplay.secret,
        description: state.modalDisplay.description,
        isModalOpen: state.modalDisplay.isModalOpen
    }
};
const mapDispatchToModalContainerDisplay = (dispatch) => {
    return {
        onModalClose: (isModalOpen) => {
            dispatch(closeModal(isModalOpen));
        }     
    }
};
const ModalContainer = connect(mapStateToModalContainerDisplay, mapDispatchToModalContainerDisplay)(ModalContent);

module.exports = ModalContainer;
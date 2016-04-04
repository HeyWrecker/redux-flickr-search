import React from 'react';

const Result = React.createClass({
    propTypes:  {
        photo: React.PropTypes.number,
        title: React.PropTypes.string,
        farm: React.PropTypes.number,
        server: React.PropTypes.number,
        secret: React.PropTypes.string,
        onThumbClick: React.PropTypes.func,
        description: React.PropTypes.string,
        children: React.PropTypes.array
        
    },
    
    getDefaultProps() {
        return {
            photo: -1,
            title: '',
            farm: -1,
            server: -1,
            secret: '',
            onThumbClick: function(){},
            description: '',
            children: []
        };
    },
    
    componentDidMount: function() {
        //$('.image').popup();
    },
    
    render() {
        let props = this.props;
        let imgURL = `http://farm${props.farm}.staticflickr.com/${props.server}/${props.photo}_${props.secret}_m.jpg`;
        
        return (
            <div className="column">
                <a 
                    href="#"

                >
                    <img 
                        src={imgURL} 
                        onClick    = {() => {
                            props.onThumbClick(props.photo, props.title, props.farm, props.server, props.secret, props.description);
                        }}
                        className="ui rounded fluid image" 
                        data-content={props.title} 
                        data-variation="wide large inverted" />
                </a>
            </div>
        )
    }
});

module.exports = Result;
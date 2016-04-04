import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../configureStore';
import SearchApp from './SearchApp';
import SearchForm from '../components/SearchForm';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <SearchApp />
            </Provider>
        )
    }
}
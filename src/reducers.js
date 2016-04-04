import {combineReducers} from 'redux';
import {INVALIDATE_SEARCH, REQUEST_IMAGES, RECEIVE_IMAGES, RECEIVE_IMAGES_FAIL, DISPLAY_MODAL, CLOSE_MODAL, DISPLAY_LOADER, CLOSE_LOADER, SET_SAFESEARCH, SET_SORT_ORDER, SET_LICENSE_TYPE} from './actions';

// Search Reducer
function searchReducer(state = {
    isFetching: false,
    didInvalidate: false,
    photos: [],
    page: 0,
    pages: 0,
    total: 0,
    searchString: '',
    safeSearch: true,
    sortOrder: 'relevance',
    licenseType: 'none'
}, action) {
    switch(action.type) {
        case INVALIDATE_SEARCH:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        
        case REQUEST_IMAGES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_IMAGES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                photos: action.photos,
                page: action.page,
                pages: action.pages,
                total: action.total,
                searchString: action.searchString,
                lastUpdated: action.receivedAt,
                status: action.status,
                safeSearch: action.safeSearch,
                licenseType: action.licenseType
            })
        case RECEIVE_IMAGES_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                photos: action.photos,
                page: action.page,
                pages: action.pages,
                total: action.total,
                searchString: action.searchString,
                lastUpdated: action.receivedAt,
                status: action.status,
                safeSearch: action.safeSearch,
                licenseType: action.licenseType
            })
        case SET_SAFESEARCH:
            return Object.assign({}, state, {
                safeSearch: action.safeSearch
            })
        case SET_SORT_ORDER:
            return Object.assign({}, state, {
                sortOrder: action.sortOrder
            })
        case SET_LICENSE_TYPE:
            return Object.assign({}, state, {
                licenseType: action.licenseType
            })
        default:
            return state
    }
}

// Modal Reducer
function modalReducer(state = {}, action) {
   
    switch(action.type) {
        case DISPLAY_MODAL:
            return Object.assign({}, state, {
                photo: action.photo,
                title: action.title,
                farm: action.farm,
                server: action.server,
                secret: action.secret,
                description: action.description,
                isModalOpen: action.isModalOpen
            })
        case CLOSE_MODAL:
            return Object.assign({}, state, {
                photo: action.photo,
                title: action.title,
                farm: action.farm,
                server: action.server,
                secret: action.secret,
                description: action.description,
                isModalOpen: action.isModalOpen
            })
        default:
            return state;    
    }
}

// LOADER REDUCER
function loaderHandler(state = {
    isFetching: false,
    isLoaderOpen: false
}, action) {
    switch(action.type){
        case DISPLAY_LOADER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isLoaderOpen: action.isLoaderOpen
            })
        case CLOSE_LOADER:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isLoaderOpen: action.isLoaderOpen
            })
        default:
            return state;    
    }         
}

const rootReducer = combineReducers({
    searchResults: searchReducer,
    modalDisplay: modalReducer,
    loaderDisplay: loaderHandler
});

export default rootReducer;
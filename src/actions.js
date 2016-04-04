import fetch from 'isomorphic-fetch';

export const INVALIDATE_SEARCH      = 'INVALIDATE_SEARCH';
export const REQUEST_IMAGES         = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES         = 'RECEIVE_IMAGES';
export const RECEIVE_IMAGES_FAIL    = 'RECEIVE_IMAGES_FAIL';
export const DISPLAY_MODAL          = 'DISPLAY_MODAL';
export const CLOSE_MODAL            = 'CLOSE_MODAL';
export const DISPLAY_LOADER         = 'DISPLAY_LOADER';
export const CLOSE_LOADER           = 'CLOSE_LOADER';
export const SET_SAFESEARCH         = 'SET_SAFESEARCH';
export const SET_SORT_ORDER         = 'SET_SORT_ORDER';
export const SET_LICENSE_TYPE       = 'SET_LICENSE_TYPE';

// LICENSE TYPE ACTION CREATOR
export function licenseTypeChange(licenseType) {
    return {
        type: SET_LICENSE_TYPE,
        licenseType
    }
}

// SORT ORDER ACTION CREATOR
export function sortOrderChange(sortOrder) {
    
    return {
        type: SET_SORT_ORDER,
        sortOrder
    }
}

// SAFE SEARCH ACTION CREATOR
export function safeSearchToggle(safeSearch) {
    
    return {
        type: SET_SAFESEARCH,
        safeSearch
    }
}


/// SEARCH ACTION CREATOR AND HELPER FUNCTIONS
export function submitSearch(searchString, page, safeSearch, sortOrder, licenseType) {
    
    return (dispatch, getState) => {
        if(shouldFetchImages(getState(), searchString, page, safeSearch, sortOrder, licenseType)) {
            return dispatch(fetchImages(searchString, page, safeSearch, sortOrder, licenseType))
        }
    }
}
    
function shouldFetchImages(state, searchString, page, safeSearch, sortOrder, licenseType) {
    const results = state.searchResults;
    
    if(!results.photos.len > 0) {
        return true
    } else if(results.isFetching) {
        return false
    } else {
        return results.didInvalidate
    }
}

function fetchImages(searchString, page, safeSearch, sortOrder, licenseType) {

    return dispatch => {
        
        dispatch(displayLoader());
        
        let newSafeSearch,
            newLicenseType = '';
        
        if (safeSearch === true) {
            newSafeSearch = 1;
        } else if (safeSearch === false) {
            newSafeSearch = 3;
        } else {
            newSafeSearch = safeSearch;
        }
        
        if (licenseType === 'is_commons') {
            newLicenseType = '&is_commons=true';
        } else if (licenseType === 'is_getty') {
            newLicenseType = '&is_getty=true'
        }
        
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=70be58408a6ffd9c02f3f108aacef41f&text=${searchString}&per_page=30&safe_search=${newSafeSearch}&sort=${sortOrder}&media=photos&extras=description&privacy_filter=1&page=${page}${newLicenseType}&format=json&nojsoncallback=1`)
            .then(function(response) {
               
                // Check the status response for anything over 400
                if (response.status >= 400) {
                    throw new Error("fail");
                }
                // Return the json object received from flickr
                // for use in the next .then();
                return response.json();
            })
            
           .then(results => {
                if(results.stat === 'ok') {
                    dispatch(receiveImages(searchString, page, results, safeSearch, sortOrder, licenseType))
                }
                dispatch(closeLoader());
            })
            .catch(error => {
                dispatch(imageFetchFail(searchString, page, error, safeSearch, sortOrder, licenseType));
                dispatch(closeLoader());
            })
            
        }
}

function imageFetchFail(searchString, page, error, safeSearch, sortOrder, licenseType) {
    return {
            type: RECEIVE_IMAGES_FAIL,
            searchString,
            page: 0,
            pages: 0,
            total: 0,
            photos: [],
            receivedAt: Date.now(),
            status: error.toString(),
            safeSearch,
            sortOrder,
            licenseType
        }
}

function receiveImages(searchString, page, json, safeSearch, sortOrder, licenseType) {
    
    let newPage     = json.photos.page,
        newPages    = json.photos.pages;
    
    // This is to account for an issue of passing in a page and there are no results returned for that page.
    // An example was searching for "Sanford" under "none" for the license filter, navigating to the second page of results,
    // then changing the license to Getty. The results displayed "Page 2 of 0" because we were looking for the second page, that was
    // the value that was passed in and returned, but the photo array contained 0 elements indicating no results.
    if(json.photos.photo.length === 0) {
        newPage     = 1,
        newPages    = 0;
    }
    
    return {
            type: RECEIVE_IMAGES,
            searchString,
            //page: json.photos.page,
            page: newPage,
            //pages: json.photos.pages,
            pages: newPages,
            total: json.photos.total,
            photos: json.photos.photo.map(photo => photo),
            receivedAt: Date.now(),
            status: json.stat,
            safeSearch,
            sortOrder,
            licenseType
        }
}

/// MODAL ACTION CREATORS
export function setModalData(photo, title, farm, server, secret, description) {

    return function(dispatch) {

        return dispatch(
            {
                type: DISPLAY_MODAL,
                photo,
                title,
                farm,
                server,
                secret,
                description,
                isModalOpen: true
            }
        )    
    }
}

export function closeModal(isModalOpen) {
    return function(dispatch) {
        return dispatch(
            {
                type: CLOSE_MODAL,
                photo: -1,
                title: '',
                farm: -1,
                server: -1,
                secret: '',
                description: '',
                isModalOpen: false
            }
        )
    }
}
    
/// LOADER ACTION CREATOR
export function displayLoader() {
    return {
        type: DISPLAY_LOADER,
        isFetching: true,
        isLoaderOpen: true
    }
}
    
export function closeLoader() {
    return {
        type: CLOSE_LOADER,
        isFetching: false,
        isLoaderOpen: false
    }
}
import appTypes from './app-types';

export const toggleSearch = () => {
    return {
        type: appTypes.TOGGLE_SEARCH
    }
}
export const toggleCart = () => {
    return {
        type: appTypes.TOGGLE_CART
    }
}
import appTypes from './app-types';

export const toggleSearch = () => {
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'unset' : 'hidden';
    document.body.style.marginRight = document.body.style.marginRight === '10px' ? 'unset' : '10px';

    return {
        type: appTypes.TOGGLE_SEARCH
    }
}
export const toggleCart = () => {
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'unset' : 'hidden';
    document.body.style.marginRight = document.body.style.marginRight === '10px' ? 'unset' : '10px';

    return {
        type: appTypes.TOGGLE_CART
    }
}
export const toggleWishlist = () => {
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'unset' : 'hidden';
    document.body.style.marginRight = document.body.style.marginRight === '10px' ? 'unset' : '10px';

    return {
        type: appTypes.TOGGLE_WISHLIST
    }
}

export const toggleProductQuickView = () => {
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'unset' : 'hidden';
    document.body.style.marginRight = document.body.style.marginRight === '10px' ? 'unset' : '10px';
    
    return {
        type: appTypes.TOGGLE_PRODUCT_QUICKVIEW
    }
}
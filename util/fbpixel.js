
  
import {app} from '../app.config';
export const FB_PIXEL_ID = app.facebook.pixelId;

export const pageView = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq('track', name, options)
}
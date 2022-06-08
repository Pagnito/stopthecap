
  
import {app} from '../app.config';
export const FB_PIXEL_ID = app.facebook.pixelId;

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq('track', name, options)
}
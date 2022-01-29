const withPWA = require('next-pwa');
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com']
  },
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
  },
  app: {
    front: {
      layout:[
        {type: 'header', style: 'edgy-transparent'},
        {type: 'carousel', style: 'edgy', width: '100%', height: '70vh', margin: '0 0 0 0'},
        {type: 'banners', style: 'service-quality', width: '100%', height: '30vh', margin: '0 0 0 0' },
        {type: 'featured-product', style: 'promotional', width: '100%', height: '100vh', margin: '0 0 0 0'},
        {type: 'featured-collection', style: 'classic', width: '100%', 'height': ''},    
        {type: 'video', style: 'auto-play', width: '100%', height: '60vh', margin: '0 0 0 0'},
        {type: 'newsletter', style: 'edgy', width: '100%', height: '20vh', margin: '0 0 0 0'},
        {type: 'footer', style: 'classic', width: '100%', height: 'unset', margin: '0 0 0 0'}
      ],
      data: {
        header: {
          links: [{type: 'Home'},{type:'About'}, {type:'Contact'}, {type: 'Shop'}],
          search_bar: true,
          wishlist: true,
          account: false //create sales for ppl with accounts, based on how long they are members? sales on new items?
        },
        carousel: {
          arrow: '',
          slides: [
            {
              img_url: '',
              text_one: 'Stopping Caps',
              text_two: 'One Cap At A Time',
              text_three: 'Free Shipping On All Orders',
              button: 'Shop Now'
            },
            {
              img_url: '',
              text_one: 'UP TO 20% OFF',
              text_two: "BECAUSE I'M NOT LYING ABOUT 50%",
              text_three: 'Free Shipping On All Orders',
              button: 'Shop Now'
            }
          ]
        },
        banners: {

        },
        featured_product: {
          id: '1234'
        },
        video: {
          url: '',
          text_one: '',
          text_two: '',
          text_three: ''
        },
        footer: {
          socials: true,
          sections: [
            {
              type: 'contact_info',
              enabled: true
            },
            {
              type: 'main_menu',
              enabled: true
            },
            {
              type: 'policies',
              enabled: true
            },
            {
              type: 'logo',
              enabled: true
            }
          ]
        }

      },
      colors: {

      }
    }

  }
}


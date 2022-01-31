module.exports = {
  app: {
    layout: {
      landing: [
        { type: "header", style: "edgy-transparent" },
        {
          type: "landing-carousel",
          style: "edgy",
          width: "100%",
          height: "70vh",
          margin: "0 0 0 0",
        },
        {
          type: "banner-row",
          style: "service-quality",
          width: "100%",
          height: "30vh",
          margin: "0 0 0 0",
        },
        {
          type: "featured-product",
          style: "hero",
          width: "100%",
          height: "100vh",
          margin: "0 0 0 0",
        },
        {
          type: "featured-collection",
          style: "edgy",
          width: "100%",
          height: "",
        },
        {
          type: "video-hero",
          style: "auto-play",
          width: "100%",
          height: "60vh",
          margin: "0 0 0 0",
        },
        {
          type: "newsletter",
          style: "edgy",
          width: "100%",
          height: "20vh",
          margin: "0 0 0 0",
        },
        // {
        //   type: "footer",
        //   style: "classic",
        //   width: "100%",
        //   height: "unset",
        //   margin: "0 0 0 0",
        // },
      ],
      data: {
        carousel: {
          arrow: "",
          slides: [
            {
              img_url: "",
              text_one: "CAP FREE PRODUCTS",
              text_two: "Stopping The Caps",
              text_three: "One Cap At A Time",
              text_four: "FREE SHIPPING ON ALL ORDERS",
              button: "Shop Now",
              type: 'one',
            },
            {
              img_url: "",
              text_one: "3 MONTHS SUBSCRIBED?",
              text_two: "YOU CAN GET UP TO",
              text_three: "UP TO 30% OFF ON NEW PRODUCTS",
              text_four: 'FREE SHIPPING ON ALL ORDERS',
              button: "Shop Now",
              type: 'two'
            },
          ],
        },
        banners: {},
        featured_product: {
          id: "1234",
        },
        video: {
          url: "",
          text_one: "",
          text_two: "",
          text_three: "",
        },
        footer: {
          socials: true,
          sections: [
            {
              type: "contact_info",
              enabled: true,
            },
            {
              type: "main_menu",
              enabled: true,
            },
            {
              type: "policies",
              enabled: true,
            },
            {
              type: "logo",
              enabled: true,
            },
          ],
        },
      },
      colors: {},
    },
  },
};

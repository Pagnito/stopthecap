module.exports = {
  app: {
    layout: {
      // landing: [
      //   { type: "header", style: "edgy-transparent" },
      //   {
      //     type: "landing-carousel",
      //     style: "edgy",
      //     width: "100%",
      //     height: "70vh",
      //     margin: "0 0 0 0",
      //   },
      //   {
      //     type: "banner-row",
      //     style: "service-quality",
      //     width: "100%",
      //     height: "30vh",
      //     margin: "0 0 0 0",
      //   },
      //   {
      //     type: "featured-product",
      //     style: "hero",
      //     width: "100%",
      //     height: "100vh",
      //     margin: "0 0 0 0",
      //   },
      //   {
      //     type: "featured-collection",
      //     style: "edgy",
      //     width: "100%",
      //     height: "",

      //   },
      //   {
      //     type: "video-hero",
      //     style: "auto-play",
      //     width: "100%",
      //     height: "60vh",
      //     margin: "0 0 0 0",
      //   },
      //   {
      //     type: "newsletter",
      //     style: "edgy",
      //     width: "100%",
      //     height: "20vh",
      //     margin: "0 0 0 0",
      //   },
        // {
        //   type: "footer",
        //   style: "classic",
        //   width: "100%",
        //   height: "unset",
        //   margin: "0 0 0 0",
        // },
      //],
      data: {
        carousel: {
          slides: [
            {
              img_url: "",
              text_one: "CAP FREE PRODUCTS",
              text_two: "Stopping The Caps",
              text_three: "One Cap At A Time",
              text_four: "FREE SHIPPING ON ALL ORDERS",
              button: "Shop Now",
              type: "one",
            },
            {
              img_url: "",
              text_one: "3 MONTHS SUBSCRIBED?",
              text_two: "GET UP TO 30% OFF",
              text_three: "ON NEW PRODUCTS",
              text_four: "FREE SHIPPING ON ALL ORDERS",
              button: "Shop Now",
              type: "two",
            },
          ],
        },
        incentives: {
          active_incentives: [
            {
              img_url: "",
              text_one: "SOMETHING COOL",
              text_two: "You can find reviews and tests of our products on our social media",
              button: "LEARN MORE"
            },
            {
              img_url: "",
              text_one: "FREE SHIPPING",
              text_two: "Almost all of the products get delivered within 7 days",
              button: "LEARN MORE"
            },
            {
              img_url: "",
              text_one: "QUALITY PRODUCTS",
              text_two: "If we wouldn't use it, we wouldn't sell it",
              button: "LEARN MORE"
            },


          ],
        },
        featured_collection: {
          number_of_rows: 2,
          number_of_columns: 4
        },
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
